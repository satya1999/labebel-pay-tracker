
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BookingFormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
}

const BookingFormActions = ({ isEditing, isSubmitting }: BookingFormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/bookings")}
        className="flex items-center gap-2"
        disabled={isSubmitting}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Bookings
      </Button>
      <Button 
        type="submit" 
        className="flex items-center gap-2"
        disabled={isSubmitting}
      >
        <Save className="h-4 w-4" />
        {isSubmitting ? 
          `${isEditing ? "Updating" : "Creating"}...` : 
          isEditing ? "Update Booking" : "Create Booking"}
      </Button>
    </div>
  );
};

export default BookingFormActions;
