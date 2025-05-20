
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking } from '@/types';

// Sample data - this would come from API in a real app
const RECENT_BOOKINGS: Booking[] = [
  {
    id: '1',
    tripId: 'trip-1',
    passengerName: 'John Doe',
    contactNumber: '9876543210',
    seatNumber: 'A1',
    advancePaid: 2000,
    remainingAmount: 3000,
    discountGiven: 0,
    paymentMode: 'Cash',
    paymentTransferredTo: 'HDFC Bank',
    isCancelled: false,
    isPaymentCollected: false,
    totalAmount: 5000,
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    tripId: 'trip-2',
    passengerName: 'Jane Smith',
    contactNumber: '8765432109',
    seatNumber: 'B3',
    advancePaid: 3000,
    remainingAmount: 0,
    discountGiven: 500,
    paymentMode: 'UPI',
    paymentTransferredTo: 'ICICI Bank',
    isCancelled: false,
    isPaymentCollected: true,
    totalAmount: 3500,
    createdAt: '2023-05-16T09:15:00Z',
    updatedAt: '2023-05-16T15:45:00Z'
  },
  {
    id: '3',
    tripId: 'trip-1',
    passengerName: 'Robert Brown',
    contactNumber: '7654321098',
    seatNumber: 'C4',
    advancePaid: 1000,
    remainingAmount: 4000,
    discountGiven: 0,
    paymentMode: 'Cash',
    paymentTransferredTo: 'SBI Bank',
    isCancelled: false,
    isPaymentCollected: false,
    totalAmount: 5000,
    createdAt: '2023-05-17T11:45:00Z',
    updatedAt: '2023-05-17T11:45:00Z'
  },
];

const RecentBookings = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Latest booking activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {RECENT_BOOKINGS.map(booking => (
            <div 
              key={booking.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-4"
            >
              <div className="space-y-1">
                <div className="font-medium">{booking.passengerName}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Seat: {booking.seatNumber}</span>
                  <span>•</span>
                  <span>₹{booking.totalAmount}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {booking.isPaymentCollected ? (
                  <Badge variant="outline" className="bg-success-light text-success">Collected</Badge>
                ) : (
                  <Badge variant="outline" className="bg-warning-light text-warning">Pending</Badge>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/bookings/${booking.id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <Link to="/bookings">View all bookings</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
