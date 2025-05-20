
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Sample data for recent bookings
const recentBookings = [
  {
    id: '1',
    passengerName: 'John Doe',
    seatNumber: 'A1',
    trip: 'Manali Adventure',
    amount: 5000
  },
  {
    id: '2',
    passengerName: 'Jane Smith',
    seatNumber: 'B3',
    trip: 'Goa Beach Vacation',
    amount: 3500
  },
  {
    id: '3',
    passengerName: 'Robert Brown',
    seatNumber: 'C4',
    trip: 'Manali Adventure',
    amount: 5000
  }
];

const RecentBookings = () => {
  return (
    <Card className="col-span-7 md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/bookings">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <Link to={`/bookings/${booking.id}`} className="font-medium hover:underline">
                  {booking.passengerName}
                </Link>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{booking.trip}</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{booking.seatNumber}</span>
                </div>
              </div>
              <div className="font-medium">₹{booking.amount}</div>
            </div>
          ))}

          {recentBookings.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No recent bookings found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
