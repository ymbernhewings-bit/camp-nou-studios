import { useEffect } from "react";
import { useCalendarAvailability } from "@/hooks/useCalendarAvailability";

interface CalendarPreloaderProps {
  apartments: Array<{
    name: string;
    icsUrl: string;
  }>;
}

const CalendarPreloader = ({ apartments }: CalendarPreloaderProps) => {
  const { checkAvailability } = useCalendarAvailability();

  useEffect(() => {
    // Preload all calendar data when the component mounts
    const preloadCalendars = async () => {
      try {
        await Promise.all(
          apartments.map(apartment => 
            checkAvailability(apartment.icsUrl).catch(() => {
              // Silently handle errors for background loading
              console.warn(`Failed to preload calendar for ${apartment.name}`);
            })
          )
        );
        console.log("Calendar data preloaded for all apartments");
      } catch (error) {
        console.warn("Some calendars failed to preload", error);
      }
    };

    preloadCalendars();
  }, [apartments, checkAvailability]);

  return null; // This component doesn't render anything
};

export default CalendarPreloader;