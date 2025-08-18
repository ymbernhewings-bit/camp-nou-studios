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
      const blockedDates = events.map(event => {
        const dates = [];
        const currentDate = new Date(event.start);
        const endDate = new Date(event.end);
        
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return dates;
      }).flat();
      
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

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
      } else if (trimmedLine === 'END:VEVENT') {
        if (currentEvent.start && currentEvent.end) {
          events.push(currentEvent as CalendarEvent);
        }
        inEvent = false;
      } else if (inEvent) {
        if (trimmedLine.startsWith('DTSTART')) {
          const dateStr = trimmedLine.split(':')[1];
          currentEvent.start = parseICSDate(dateStr);
        } else if (trimmedLine.startsWith('DTEND')) {
          const dateStr = trimmedLine.split(':')[1];
          currentEvent.end = parseICSDate(dateStr);
        } else if (trimmedLine.startsWith('SUMMARY')) {
          currentEvent.summary = trimmedLine.split(':')[1];
        }
      }
    }

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