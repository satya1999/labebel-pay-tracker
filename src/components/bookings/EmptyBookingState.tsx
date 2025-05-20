
import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const EmptyBookingState = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center space-y-3 py-6">
          <div className="text-muted-foreground">
            No bookings found
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1">
            <Link to="/bookings/new">
              <PlusCircle className="h-4 w-4" />
              Add New Booking
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyBookingState;
