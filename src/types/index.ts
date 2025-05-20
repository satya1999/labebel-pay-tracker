
export type UserRole = "admin" | "agent";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Booking {
  id: string;
  tripId: string;
  passengerName: string;
  contactNumber: string;
  seatNumber: string;
  advancePaid: number;
  remainingAmount: number;
  discountGiven: number;
  relativeContactNumber?: string;
  paymentMode: "Cash" | "UPI" | "NEFT";
  paymentTransferredTo: string;
  isCancelled: boolean;
  isPaymentCollected: boolean;
  totalAmount: number;
  notes?: string;
  screenshotUrl?: string;
  collectedBy?: string;
  collectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: number;
  totalSeats: number;
}

export interface DashboardStats {
  totalBookings: number;
  totalAmountToBeCollected: number;
  collectedAmount: number;
  pendingAmount: number;
  todayCollections: number;
}
