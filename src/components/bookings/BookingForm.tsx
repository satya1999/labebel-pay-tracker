
import React from 'react';
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  BookingDetailsSection,
  PassengerDetailsSection,
  SeatInformationSection,
  PaymentInformationSection,
  AdditionalInformationSection
} from './form-sections';

import { useBookingForm } from './form/useBookingForm';
import BookingFormHeader from './form/BookingFormHeader';
import BookingFormActions from './form/BookingFormActions';

interface BookingFormProps {
  bookingId?: string; // If provided, we're editing an existing booking
}

const BookingForm = ({ bookingId }: BookingFormProps) => {
  const {
    form,
    isSubmitting,
    isEditing,
    remainingAmount,
    onSubmit
  } = useBookingForm({ bookingId });

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
        <BookingFormHeader isEditing={isEditing} />
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BookingDetailsSection control={form.control} />
            <PassengerDetailsSection control={form.control} />
            <SeatInformationSection control={form.control} />
            <PaymentInformationSection control={form.control} remainingAmount={remainingAmount} />
            <AdditionalInformationSection control={form.control} />
            
            <BookingFormActions
              isEditing={isEditing}
              isSubmitting={isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
