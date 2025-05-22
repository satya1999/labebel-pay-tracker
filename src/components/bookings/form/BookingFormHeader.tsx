
import React from 'react';
import { CalendarPlus } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";

interface BookingFormHeaderProps {
  isEditing: boolean;
}

const BookingFormHeader = ({ isEditing }: BookingFormHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <CalendarPlus className="h-5 w-5 text-purple-500" />
      <div>
        <CardTitle>{isEditing ? "Edit Booking" : "Create New Booking"}</CardTitle>
        <CardDescription>
          {isEditing 
            ? "Update the booking information below" 
            : "Enter the passenger and payment details to create a new booking"}
        </CardDescription>
      </div>
    </div>
  );
};

export default BookingFormHeader;
