
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

import {
  BookingDetailsSection,
  PassengerDetailsSection,
  SeatInformationSection,
  PaymentInformationSection,
  AdditionalInformationSection
} from './form-sections';

// Define form validation schema
const formSchema = z.object({
  passengerName: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Enter a valid phone number"),
  seatNumber: z.string().min(1, "Seat number is required"),
  relativeContactNumber: z.string().optional(),
  advancePaid: z.coerce.number().min(0, "Amount must be positive"),
  discountGiven: z.coerce.number().min(0, "Amount must be positive"),
  totalAmount: z.coerce.number().min(1, "Total amount is required"),
  paymentMode: z.enum(["Cash", "UPI", "NEFT"]),
  paymentTransferredTo: z.string().min(1, "Bank name is required"),
  isPaymentCollected: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  notes: z.string().optional(),
  screenshotUrl: z.string().optional().nullable(),
  // New fields
  bookingDate: z.date().optional(),
  aadharCardNumber: z.string().optional(),
  address: z.string().optional(),
  age: z.coerce.number().min(0).optional(),
  gender: z.enum(["M", "F", "Other"]).optional(),
  bloodGroup: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  bookingId?: string; // If provided, we're editing an existing booking
}

const BookingForm = ({ bookingId }: BookingFormProps) => {
  const navigate = useNavigate();
  const isEditing = Boolean(bookingId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For a real app, you would fetch the booking data if editing
  const defaultValues: Partial<FormValues> = isEditing 
    ? {
        passengerName: "John Doe",
        contactNumber: "9876543210",
        seatNumber: "A1",
        relativeContactNumber: "",
        advancePaid: 2000,
        discountGiven: 0,
        totalAmount: 5000,
        paymentMode: "Cash",
        paymentTransferredTo: "HDFC Bank",
        isPaymentCollected: false,
        isCancelled: false,
        notes: "",
        screenshotUrl: null,
        bookingDate: new Date(),
        aadharCardNumber: "",
        address: "",
        age: 0,
        gender: "M",
        bloodGroup: "",
      } 
    : {
        advancePaid: 0,
        discountGiven: 0,
        totalAmount: 5000,
        isPaymentCollected: false,
        isCancelled: false,
        bookingDate: new Date(),
        screenshotUrl: null,
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [remainingAmount, setRemainingAmount] = useState(
    defaultValues.totalAmount! - defaultValues.advancePaid! - defaultValues.discountGiven!
  );

  // Calculate remaining amount whenever relevant fields change
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "totalAmount" || name === "advancePaid" || name === "discountGiven") {
        const total = value.totalAmount || 0;
        const advance = value.advancePaid || 0;
        const discount = value.discountGiven || 0;
        setRemainingAmount(total - advance - discount);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      // Calculate remaining amount
      const remaining = data.totalAmount - data.advancePaid - data.discountGiven;
      
      // Prepare booking data for Supabase
      const bookingData = {
        trip_id: "trip-1", // For now using a default trip ID, in a real app this would be selected
        passenger_name: data.passengerName,
        contact_number: data.contactNumber,
        seat_number: data.seatNumber,
        advance_paid: data.advancePaid,
        total_amount: data.totalAmount,
        remaining_amount: remaining,
        discount_given: data.discountGiven,
        relative_contact_number: data.relativeContactNumber || null,
        payment_mode: data.paymentMode,
        payment_transferred_to: data.paymentTransferredTo,
        is_cancelled: data.isCancelled,
        is_payment_collected: data.isPaymentCollected,
        notes: data.notes || null,
        booking_date: data.bookingDate?.toISOString() || new Date().toISOString(),
        aadhar_card_number: data.aadharCardNumber || null,
        address: data.address || null,
        age: data.age || null,
        gender: data.gender || null,
        blood_group: data.bloodGroup || null,
        screenshot_url: data.screenshotUrl || null,
      };

      // Insert or update booking in Supabase
      let response;
      
      if (isEditing) {
        response = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', bookingId);
      } else {
        response = await supabase
          .from('bookings')
          .insert([bookingData]);
      }

      if (response.error) {
        throw response.error;
      }
      
      toast.success(
        isEditing ? "Booking updated successfully" : "Booking created successfully", {
          description: `Passenger: ${data.passengerName}, Seat: ${data.seatNumber}`,
          duration: 3000,
        }
      );
      
      navigate("/bookings");
    } catch (error: any) {
      console.error("Error saving booking:", error);
      toast.error("Failed to save booking", {
        description: error.message || "An unexpected error occurred",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
        <div className="flex items-center gap-2">
          <CalendarPlus className="h-5 w-5 text-purple-500" />
          <CardTitle>{isEditing ? "Edit Booking" : "Create New Booking"}</CardTitle>
        </div>
        <CardDescription>
          {isEditing 
            ? "Update the booking information below" 
            : "Enter the passenger and payment details to create a new booking"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BookingDetailsSection control={form.control} />
            <PassengerDetailsSection control={form.control} />
            <SeatInformationSection control={form.control} />
            <PaymentInformationSection control={form.control} remainingAmount={remainingAmount} />
            <AdditionalInformationSection control={form.control} />
            
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
