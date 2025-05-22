
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formSchema, FormValues } from './FormSchema';

interface UseBookingFormProps {
  bookingId?: string;
}

export const useBookingForm = ({ bookingId }: UseBookingFormProps) => {
  const navigate = useNavigate();
  const isEditing = Boolean(bookingId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default values for the form
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
  useEffect(() => {
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

  return {
    form,
    isSubmitting,
    isEditing,
    remainingAmount,
    onSubmit
  };
};
