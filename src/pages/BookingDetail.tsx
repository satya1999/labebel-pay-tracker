
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Booking } from '@/types';

// Sample booking data - would come from API in real app
const SAMPLE_BOOKING: Booking = {
  id: '1',
  tripId: 'trip-1',
  passengerName: 'John Doe',
  contactNumber: '9876543210',
  seatNumber: 'A1',
  advancePaid: 2000,
  remainingAmount: 3000,
  discountGiven: 0,
  relativeContactNumber: '9988776655',
  paymentMode: 'Cash',
  paymentTransferredTo: 'HDFC Bank',
  isCancelled: false,
  isPaymentCollected: false,
  totalAmount: 5000,
  notes: 'Prefers window seat',
  createdAt: '2023-05-15T10:30:00Z',
  updatedAt: '2023-05-15T10:30:00Z'
};

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, fetch the booking by ID
  const booking = SAMPLE_BOOKING;
  
  const handlePaymentCollected = () => {
    // In a real app, update payment status via API
    toast.success("Payment marked as collected");
  };
  
  const handleCancelBooking = () => {
    // In a real app, cancel the booking via API
    toast.success("Booking has been cancelled");
  };
  
  const handleGenerateReceipt = () => {
    // In a real app, generate and possibly print/download receipt
    toast.success("Receipt generated and ready for download");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-muted-foreground">
            View and manage booking information
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link to={`/bookings/edit/${id}`}>Edit</Link>
          </Button>
          <Button onClick={handleGenerateReceipt}>Generate Receipt</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Passenger Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Passenger Name</p>
                <p className="font-medium">{booking.passengerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seat Number</p>
                <p className="font-medium">{booking.seatNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Number</p>
                <p className="font-medium">{booking.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Relative Contact</p>
                <p className="font-medium">{booking.relativeContactNumber || "N/A"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{booking.notes || "No additional notes"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium">₹{booking.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Advance Paid</p>
                <p className="font-medium">₹{booking.advancePaid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discount Given</p>
                <p className="font-medium">₹{booking.discountGiven}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining Amount</p>
                <p className="font-medium">₹{booking.remainingAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Mode</p>
                <p className="font-medium">{booking.paymentMode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment To</p>
                <p className="font-medium">{booking.paymentTransferredTo}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {booking.isPaymentCollected ? (
                    <Badge variant="outline" className="bg-success-light text-success">
                      Collected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-warning-light text-warning">
                      Pending
                    </Badge>
                  )}
                  
                  {!booking.isPaymentCollected && (
                    <Button size="sm" variant="default" onClick={handlePaymentCollected}>
                      Mark as Collected
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center border-t pt-6">
        <Button variant="outline" asChild>
          <Link to="/bookings">Back to Bookings</Link>
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Cancel Booking</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Booking</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">No, Keep Booking</Button>
              <Button variant="destructive" onClick={handleCancelBooking}>Yes, Cancel Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookingDetail;
