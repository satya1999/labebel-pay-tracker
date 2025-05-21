
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
    ? format(new Date(booking.bookingDate), 'dd MMM yyyy')
    : '-';

  return (
    <TableRow key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>
        <Link to={`/bookings/${booking.id}`} className="font-medium text-purple-700 hover:text-purple-900 hover:underline">
          {booking.passengerName}
        </Link>
        <div className="text-xs text-muted-foreground">{formattedBookingDate}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{booking.seatNumber}</TableCell>
      <TableCell className="hidden lg:table-cell">{booking.contactNumber}</TableCell>
      <TableCell className="hidden xl:table-cell">{booking.aadharCardNumber || '-'}</TableCell>
      <TableCell className="text-right font-medium">
        ₹{booking.advancePaid.toLocaleString()}
      </TableCell>
      <TableCell className="text-right hidden xl:table-cell">
        ₹{booking.remainingAmount.toLocaleString()}
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
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" asChild className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
            <Link to={`/bookings/${booking.id}`}>View</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
            <Link to={`/bookings/edit/${booking.id}`}>Edit</Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
