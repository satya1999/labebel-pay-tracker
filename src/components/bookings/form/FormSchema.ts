
import { z } from "zod";

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;
