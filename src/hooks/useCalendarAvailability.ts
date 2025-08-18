import { useState } from "react";

interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
}

export const useCalendarAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = async (icsUrl: string): Promise<Date[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // Since we can't directly parse ICS in the browser due to CORS,
      // we'll use a proxy service or handle it differently
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icsUrl)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch calendar data');
      }
      
      const icsData = await response.text();
      
      // Parse ICS data manually (simplified parsing)
      const events = parseICSEvents(icsData);
      
      // Get blocked dates (dates with events are unavailable)
      // For Airbnb, the end date is checkout date, so we don't include it in blocked range
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
      
      console.log('Blocked dates count:', blockedDates.length);
      console.log('Sample blocked dates:', blockedDates.slice(0, 5).map(d => d.toLocaleDateString()));
      
      setLoading(false);
      return blockedDates;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check availability');
      setLoading(false);
      return [];
    }
  };

  const parseICSEvents = (icsData: string): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const lines = icsData.split('\n');
    let currentEvent: Partial<CalendarEvent> = {};
    let inEvent = false;

    console.log('Parsing ICS data, total lines:', lines.length);

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
      } else if (trimmedLine === 'END:VEVENT') {
        if (currentEvent.start && currentEvent.end) {
          console.log('Parsed event:', currentEvent);
          events.push(currentEvent as CalendarEvent);
        }
        inEvent = false;
      } else if (inEvent) {
        // Handle DTSTART with optional parameters like DTSTART;VALUE=DATE:
        if (trimmedLine.startsWith('DTSTART')) {
          const colonIndex = trimmedLine.indexOf(':');
          if (colonIndex !== -1) {
            const dateStr = trimmedLine.substring(colonIndex + 1);
            currentEvent.start = parseICSDate(dateStr);
            console.log('Parsed start date:', dateStr, '→', currentEvent.start);
          }
        } 
        // Handle DTEND with optional parameters like DTEND;VALUE=DATE:
        else if (trimmedLine.startsWith('DTEND')) {
          const colonIndex = trimmedLine.indexOf(':');
          if (colonIndex !== -1) {
            const dateStr = trimmedLine.substring(colonIndex + 1);
            currentEvent.end = parseICSDate(dateStr);
            console.log('Parsed end date:', dateStr, '→', currentEvent.end);
          }
        } 
        else if (trimmedLine.startsWith('SUMMARY')) {
          const colonIndex = trimmedLine.indexOf(':');
          if (colonIndex !== -1) {
            currentEvent.summary = trimmedLine.substring(colonIndex + 1);
          }
        }
      }
    }

    console.log('Total events parsed:', events.length);
    return events;
  };

  const parseICSDate = (dateStr: string): Date => {
    // Handle YYYYMMDD or YYYYMMDDTHHMMSSZ formats
    if (dateStr.length === 8) {
      // YYYYMMDD format
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1; // Month is 0-indexed
      const day = parseInt(dateStr.substring(6, 8));
      return new Date(year, month, day);
    } else if (dateStr.includes('T')) {
      // YYYYMMDDTHHMMSSZ format
      const datePart = dateStr.split('T')[0];
      const year = parseInt(datePart.substring(0, 4));
      const month = parseInt(datePart.substring(4, 6)) - 1;
      const day = parseInt(datePart.substring(6, 8));
      return new Date(year, month, day);
    }
    
    return new Date();
  };

  return { checkAvailability, loading, error };
};