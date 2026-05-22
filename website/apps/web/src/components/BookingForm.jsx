
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const BookingForm = ({ arenas, preselectedArena = null }) => {
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [selectedArena, setSelectedArena] = useState(preselectedArena?.name || '');
  const [playerCount, setPlayerCount] = useState('2');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    { label: '9 AM - 10 AM', value: '09:00-10:00', period: 'Morning' },
    { label: '10 AM - 11 AM', value: '10:00-11:00', period: 'Morning' },
    { label: '11 AM - 12 PM', value: '11:00-12:00', period: 'Morning' },
    { label: '12 PM - 1 PM', value: '12:00-13:00', period: 'Afternoon' },
    { label: '1 PM - 2 PM', value: '13:00-14:00', period: 'Afternoon' },
    { label: '2 PM - 3 PM', value: '14:00-15:00', period: 'Afternoon' },
    { label: '3 PM - 4 PM', value: '15:00-16:00', period: 'Afternoon' },
    { label: '4 PM - 5 PM', value: '16:00-17:00', period: 'Afternoon' },
    { label: '5 PM - 6 PM', value: '17:00-18:00', period: 'Evening' },
    { label: '6 PM - 7 PM', value: '18:00-19:00', period: 'Evening' },
    { label: '7 PM - 8 PM', value: '19:00-20:00', period: 'Evening' },
    { label: '8 PM - 9 PM', value: '20:00-21:00', period: 'Evening' },
    { label: '9 PM - 10 PM', value: '21:00-22:00', period: 'Evening' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !timeSlot || !selectedArena || !playerCount) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all booking details.',
        variant: 'destructive',
      });
      return;
    }

    const booking = {
      date: format(date, 'PPP'),
      timeSlot: timeSlots.find(slot => slot.value === timeSlot)?.label,
      arena: selectedArena,
      players: playerCount,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('paddlesPKBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('paddlesPKBookings', JSON.stringify(existingBookings));

    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset form
    setDate(null);
    setTimeSlot('');
    setSelectedArena('');
    setPlayerCount('2');
    
    toast({
      title: 'Booking confirmed',
      description: 'Your court has been reserved successfully.',
    });
  };

  const groupedSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.period]) {
      acc[slot.period] = [];
    }
    acc[slot.period].push(slot);
    return acc;
  }, {});

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Date Picker */}
          <div>
            <Label className="flex items-center space-x-2 mb-4 text-base font-semibold">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span>Select Date</span>
            </Label>
            <div className="border rounded-xl p-4 bg-muted/30">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            {/* Arena Selection */}
            <div>
              <Label className="flex items-center space-x-2 mb-3 text-base font-semibold">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Select Arena</span>
              </Label>
              <Select value={selectedArena} onValueChange={setSelectedArena}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Choose an arena" />
                </SelectTrigger>
                <SelectContent>
                  {arenas.map((arena) => (
                    <SelectItem key={arena.name} value={arena.name}>
                      {arena.name} - {arena.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Slot Selection */}
            <div>
              <Label className="flex items-center space-x-2 mb-3 text-base font-semibold">
                <Clock className="h-5 w-5 text-primary" />
                <span>Select Time Slot</span>
              </Label>
              <div className="space-y-4">
                {Object.entries(groupedSlots).map(([period, slots]) => (
                  <div key={period}>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                      {period}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {slots.map((slot) => (
                        <Button
                          key={slot.value}
                          type="button"
                          variant={timeSlot === slot.value ? 'default' : 'outline'}
                          onClick={() => setTimeSlot(slot.value)}
                          className={`h-10 text-sm transition-all duration-200 ${
                            timeSlot === slot.value
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:border-primary'
                          }`}
                        >
                          {slot.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Count */}
            <div>
              <Label className="flex items-center space-x-2 mb-3 text-base font-semibold">
                <Users className="h-5 w-5 text-primary" />
                <span>Number of Players</span>
              </Label>
              <Select value={playerCount} onValueChange={setPlayerCount}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Players</SelectItem>
                  <SelectItem value="3">3 Players</SelectItem>
                  <SelectItem value="4">4 Players</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmed</DialogTitle>
            <DialogDescription>
              Your padel court has been successfully reserved.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold">{date && format(date, 'PPP')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-semibold">
                {timeSlots.find(slot => slot.value === timeSlot)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Arena:</span>
              <span className="font-semibold">{selectedArena}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Players:</span>
              <span className="font-semibold">{playerCount}</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmationClose} className="w-full">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingForm;
