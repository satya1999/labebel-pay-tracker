
import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/types';

interface BookingTableRowProps {
  booking: Booking;
  index: number;
}

const BookingTableRow = ({ booking, index }: BookingTableRowProps) => {
  return (
    <TableRow key={booking.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="font-medium">{booking.passengerName}</TableCell>
      <TableCell>₹{booking.advancePaid}</TableCell>
      <TableCell>₹{booking.remainingAmount}</TableCell>
      <TableCell>₹{booking.discountGiven || 0}</TableCell>
      <TableCell>{booking.contactNumber}</TableCell>
      <TableCell>{booking.relativeContactNumber || '-'}</TableCell>
      <TableCell>{booking.seatNumber}</TableCell>
      <TableCell>
        {booking.isPaymentCollected ? (
          <Badge variant="outline" className="bg-success-light text-success">
            Collected
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-warning-light text-warning">
            Pending
          </Badge>
        )}
      </TableCell>
      <TableCell>{booking.paymentMode}</TableCell>
      <TableCell>{booking.remainingAmount > 0 ? 'Rest' : 'Full'}</TableCell>
      <TableCell>{booking.paymentTransferredTo}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/bookings/${booking.id}`}>View</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
