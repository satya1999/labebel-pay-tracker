
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

  function onSubmit(data: FormValues) {
    // In a real app, you would send this data to your backend
    console.log(data);
    
    toast.success(
      isEditing ? "Booking updated successfully" : "Booking created successfully", {
        description: `Passenger: ${data.passengerName}, Seat: ${data.seatNumber}`,
        duration: 3000,
      }
    );
    
    navigate("/bookings");
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
              >
                <ArrowLeft className="h-4 w-4" /> Back to Bookings
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? "Update Booking" : "Create Booking"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
