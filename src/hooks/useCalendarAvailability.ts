import { useState } from "react";

interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
}

// Calendar URLs for each apartment
const CALENDAR_URLS = {
  "Coral Studio": {
    airbnb: "https://www.airbnb.com/calendar/ical/1095572106327138736.ics?s=5b099ab3b0239722393598e285f0cc14",
    booking: "https://ical.booking.com/v1/export?t=cecd6146-8aed-4354-be0f-0f35736f8ac1"
  },
  "Olive 1 Bedroom": {
    airbnb: "https://www.airbnb.com/calendar/ical/1076840964171198214.ics?s=63fbede26f54903652eecfebe6dc3fcd",
    booking: "https://ical.booking.com/v1/export?t=c89842d3-1bca-4fb4-abc6-3902f515a5a8"
  },
  "Jasmine 3 Bedrooms": {
    airbnb: "https://www.airbnb.com/calendar/ical/1076614315151123442.ics?s=a99e8323a5b151010af4f843e16ab511",
    booking: "https://ical.booking.com/v1/export?t=3b3f2c0e-0077-4b26-86d4-23c22dc7d7cd"
  }
};

// Spanish apartment names mapping
const SPANISH_APARTMENT_NAMES = {
  "Estudio Coral": "Coral Studio",
  "Olivo 1 Habitación": "Olive 1 Bedroom",
  "Jasmín 3 Habitaciones": "Jasmine 3 Bedrooms"
};

export const useCalendarAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = async (icsUrlOrApartmentName: string): Promise<Date[]> => {
    setLoading(true);
    setError(null);
    
    try {
      let calendarsToCheck: string[] = [];
      
      // Check if it's an apartment name or ICS URL
      if (icsUrlOrApartmentName.startsWith('http')) {
        // It's an ICS URL, use it directly
        calendarsToCheck = [icsUrlOrApartmentName];
      } else {
        // It's an apartment name, get both calendar URLs
        let apartmentName = icsUrlOrApartmentName;
        
        // Handle Spanish apartment names
        if (SPANISH_APARTMENT_NAMES[apartmentName as keyof typeof SPANISH_APARTMENT_NAMES]) {
          apartmentName = SPANISH_APARTMENT_NAMES[apartmentName as keyof typeof SPANISH_APARTMENT_NAMES];
        }
        
        const apartmentCalendars = CALENDAR_URLS[apartmentName as keyof typeof CALENDAR_URLS];
        if (apartmentCalendars) {
          calendarsToCheck = [apartmentCalendars.airbnb, apartmentCalendars.booking];
        } else {
          throw new Error(`Unknown apartment: ${apartmentName}`);
        }
      }
      
      console.log('Checking calendars for:', icsUrlOrApartmentName);
      console.log('Calendar URLs to check:', calendarsToCheck);
      
      // Fetch all calendars in parallel
      const allBlockedDates: Date[] = [];
      
      for (const calendarUrl of calendarsToCheck) {
        try {
          const blockedDates = await fetchSingleCalendar(calendarUrl);
          allBlockedDates.push(...blockedDates);
          console.log(`Found ${blockedDates.length} blocked dates from ${calendarUrl.includes('airbnb') ? 'Airbnb' : 'Booking.com'}`);
        } catch (err) {
          console.warn(`Failed to fetch calendar from ${calendarUrl}:`, err);
          // Continue with other calendars even if one fails
        }
      }
      
      // Remove duplicate dates
      const uniqueBlockedDates = removeDuplicateDates(allBlockedDates);
      
      console.log('Total unique blocked dates:', uniqueBlockedDates.length);
      console.log('Sample blocked dates:', uniqueBlockedDates.slice(0, 5).map(d => d.toLocaleDateString()));
      
      setLoading(false);
      return uniqueBlockedDates;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check availability';
      console.error('Calendar availability error:', errorMessage);
      setError(errorMessage);
      setLoading(false);
      return [];
    }
  };

  const fetchSingleCalendar = async (icsUrl: string): Promise<Date[]> => {
    // Try multiple proxy services for better reliability
    const proxyServices = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(icsUrl)}`,
      `https://cors-anywhere.herokuapp.com/${icsUrl}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(icsUrl)}`
    ];
    
    let lastError: Error | null = null;
    
    for (const proxyUrl of proxyServices) {
      try {
        console.log('Trying proxy:', proxyUrl.split('?')[0]);
        
        const response = await fetch(proxyUrl, {
          headers: {
            'User-Agent': 'Calendar-Sync/1.0'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const icsData = await response.text();
        
        if (!icsData || !icsData.includes('BEGIN:VCALENDAR')) {
          throw new Error('Invalid ICS data received');
        }
        
        console.log('Successfully fetched calendar data, length:', icsData.length);
        
        // Parse ICS data
        const events = parseICSEvents(icsData);
        
        // Convert events to blocked dates
        const blockedDates = events.map(event => {
          const dates = [];
          const currentDate = new Date(event.start);
          const endDate = new Date(event.end);
          
          // Include start date up to (but not including) end date
          while (currentDate < endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          return dates;
        }).flat();
        
        return blockedDates;
        
      } catch (err) {
        console.warn(`Proxy ${proxyUrl.split('?')[0]} failed:`, err);
        lastError = err instanceof Error ? err : new Error('Unknown error');
        continue;
      }
    }
    
    throw new Error(`All proxy services failed. Last error: ${lastError?.message}`);
  };

  const parseICSEvents = (icsData: string): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const lines = icsData.split('\n').map(line => line.trim());
    let currentEvent: Partial<CalendarEvent> = {};
    let inEvent = false;

    console.log('Parsing ICS data, total lines:', lines.length);

    for (const line of lines) {
      if (line === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
      } else if (line === 'END:VEVENT') {
        if (currentEvent.start && currentEvent.end) {
          events.push(currentEvent as CalendarEvent);
        }
        inEvent = false;
      } else if (inEvent && line.includes(':')) {
        const colonIndex = line.indexOf(':');
        const key = line.substring(0, colonIndex).toUpperCase();
        const value = line.substring(colonIndex + 1);
        
        if (key.startsWith('DTSTART')) {
          currentEvent.start = parseICSDate(value);
        } else if (key.startsWith('DTEND')) {
          currentEvent.end = parseICSDate(value);
        } else if (key === 'SUMMARY') {
          currentEvent.summary = value;
        }
      }
    }

    console.log('Total events parsed:', events.length);
    return events.filter(event => event.start && event.end);
  };

  const parseICSDate = (dateStr: string): Date => {
    try {
      // Handle YYYYMMDD format
      if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1; // Month is 0-indexed
        const day = parseInt(dateStr.substring(6, 8));
        return new Date(year, month, day);
      }
      
      // Handle YYYYMMDDTHHMMSSZ format
      if (dateStr.includes('T')) {
        const datePart = dateStr.split('T')[0];
        if (datePart.length === 8 && /^\d{8}$/.test(datePart)) {
          const year = parseInt(datePart.substring(0, 4));
          const month = parseInt(datePart.substring(4, 6)) - 1;
          const day = parseInt(datePart.substring(6, 8));
          return new Date(year, month, day);
        }
      }
      
      // Fallback: try to parse as ISO date
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
      
      console.warn('Could not parse date:', dateStr);
      return new Date();
    } catch (err) {
      console.error('Error parsing date:', dateStr, err);
      return new Date();
    }
  };

  const removeDuplicateDates = (dates: Date[]): Date[] => {
    const seen = new Set<string>();
    return dates.filter(date => {
      const dateStr = date.toDateString();
      if (seen.has(dateStr)) {
        return false;
      }
      seen.add(dateStr);
      return true;
    });
  };

  return { checkAvailability, loading, error };
};
