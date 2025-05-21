
import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/types';
import { format } from 'date-fns';

interface BookingTableRowProps {
  booking: Booking;
  index: number;
}

const BookingTableRow = ({ booking, index }: BookingTableRowProps) => {
  // Format booking date if available
  const formattedBookingDate = booking.bookingDate 
    ? new Date(booking.bookingDate).toLocaleDateString() 
    : '-';

  return (
    <TableRow key={booking.id}>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>
        <Link to={`/bookings/${booking.id}`} className="font-medium hover:underline">
          {booking.passengerName}
        </Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">{formattedBookingDate}</TableCell>
      <TableCell className="hidden md:table-cell">{booking.seatNumber}</TableCell>
      <TableCell className="hidden lg:table-cell">{booking.contactNumber}</TableCell>
      <TableCell className="text-right">
        ₹{booking.advancePaid}
      </TableCell>
      <TableCell className="text-right hidden xl:table-cell">
        ₹{booking.remainingAmount}
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        {booking.isPaymentCollected ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Collected
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/bookings/${booking.id}`}>View</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/bookings/edit/${booking.id}`}>Edit</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
