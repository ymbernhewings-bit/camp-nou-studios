import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useCalendarAvailability } from "@/hooks/useCalendarAvailability";
import { Loader2, CalendarDays, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AvailabilityCheckerProps {
  apartmentName: string;
  icsUrl: string;
}

const AvailabilityChecker = ({ apartmentName, icsUrl }: AvailabilityCheckerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const { checkAvailability, loading, error } = useCalendarAvailability();
  const { toast } = useToast();

  const handleCheckAvailability = async () => {
    if (!hasChecked) {
      try {
        const blocked = await checkAvailability(icsUrl);
        setBlockedDates(blocked);
        setHasChecked(true);
        
        toast({
          title: "Calendar Updated",
          description: "Availability information has been loaded successfully.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Could not load availability. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    }
    setOpen(true);
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => 
      blockedDate.toDateString() === date.toDateString()
    );
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && !isDateBlocked(date);
  };

  const modifiers = {
    available: (date: Date) => isDateAvailable(date),
    blocked: (date: Date) => isDateBlocked(date),
    past: (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    },
  };

  const modifiersStyles = {
    available: {
      backgroundColor: 'hsl(var(--success))',
      color: 'hsl(var(--success-foreground))',
    },
    blocked: {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
      opacity: 0.7,
    },
    past: {
      opacity: 0.3,
    },
  };

  const handleBookingInquiry = () => {
    const phoneNumber = "34618254217";
    const dateStr = selectedDate ? selectedDate.toLocaleDateString() : "specific dates";
    const message = encodeURIComponent(
      `Hi! I'm interested in booking the ${apartmentName} for ${dateStr}. Is this date available? What are the rates and exclusive perks for direct booking?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="availability"
          size="lg"
          onClick={handleCheckAvailability}
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading Calendar...
            </>
          ) : (
            <>
              <CalendarDays className="w-4 h-4 mr-2" />
              Check Availability
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {apartmentName} Availability
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Select a date to check availability and inquire via WhatsApp
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <div className="text-center text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-success" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="w-3 h-3 text-destructive" />
                <span>Booked</span>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border shadow-sm"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </div>
          
          {selectedDate && (
            <div className="text-center space-y-2">
              <p className="text-sm">
                {isDateAvailable(selectedDate) ? (
                  <span className="text-success font-medium">
                    ✓ {selectedDate.toLocaleDateString()} appears to be available!
                  </span>
                ) : (
                  <span className="text-destructive font-medium">
                    ✗ {selectedDate.toLocaleDateString()} is not available
                  </span>
                )}
              </p>
              
              <Button
                variant="whatsapp"
                onClick={handleBookingInquiry}
                className="w-full"
              >
                Inquire via WhatsApp
              </Button>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground text-center">
            Availability is updated in real-time. Contact us directly for the best rates!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityChecker;