
import React from 'react';
import BookingForm from '@/components/bookings/BookingForm';

const AddBooking = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Booking</h1>
        <p className="text-muted-foreground">
          Create a new passenger booking record
        </p>
      </div>
      
      <BookingForm />
    </div>
  );
};

export default AddBooking;
