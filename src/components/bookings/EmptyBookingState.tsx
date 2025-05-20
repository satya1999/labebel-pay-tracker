
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

const EmptyBookingState = () => {
  return (
    <TableRow>
      <TableCell colSpan={13} className="text-center h-24">
        No bookings found
      </TableCell>
    </TableRow>
  );
};

export default EmptyBookingState;
