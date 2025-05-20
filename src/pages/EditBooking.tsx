
import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '@/components/bookings/BookingForm';

const EditBooking = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Booking</h1>
        <p className="text-muted-foreground">
          Update booking information and payment status
        </p>
      </div>
      
      <BookingForm bookingId={id} />
    </div>
  );
};

export default EditBooking;
