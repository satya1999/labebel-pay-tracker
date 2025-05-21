
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarPlus, ArrowLeft, Save, Calendar, User, DollarSign, Phone, IdCard, Users, MapPin, Cake } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

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
            <div>
              <h3 className="text-lg font-medium mb-3">Booking Details</h3>
              <Separator className="mb-6" />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Booking Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full pl-3 text-left font-normal flex justify-between items-center"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Passenger Details</h3>
              <Separator className="mb-6" />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="passengerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passenger Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Enter full name" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Enter mobile number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="aadharCardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar Card Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Enter Aadhar number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="relativeContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relative Contact Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Optional emergency contact" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Optional emergency contact number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Enter address" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Cake className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="number" className="pl-10" placeholder="Enter age" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Group</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Seat Information</h3>
              <Separator className="mb-6" />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="seatNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. A1, B2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Payment Information</h3>
              <Separator className="mb-6" />
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="number" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="advancePaid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advance Paid</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="number" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discountGiven"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Given</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="number" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Remaining Amount</FormLabel>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      value={remainingAmount} 
                      disabled 
                      className={`pl-10 bg-muted ${remainingAmount > 0 ? 'border-yellow-300 text-yellow-700' : 'border-green-300 text-green-700'}`}
                    />
                  </div>
                  <FormDescription>Auto-calculated from total, advance, and discount</FormDescription>
                </div>
                
                <FormField
                  control={form.control}
                  name="paymentMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="NEFT">NEFT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentTransferredTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Transferred To</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                          <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                          <SelectItem value="SBI Bank">SBI Bank</SelectItem>
                          <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <FormField
                  control={form.control}
                  name="isPaymentCollected"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Payment Collected</FormLabel>
                        <FormDescription>
                          Mark if payment has been fully collected
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isCancelled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Cancelled</FormLabel>
                        <FormDescription>
                          Mark if this booking has been cancelled
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Additional Information</h3>
              <Separator className="mb-6" />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any special notes or payment details"
                        className="resize-none min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
