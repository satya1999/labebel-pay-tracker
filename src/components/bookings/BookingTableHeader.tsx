
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

const BookingTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[60px]">ID</TableHead>
        <TableHead>Passenger</TableHead>
        <TableHead className="hidden md:table-cell">Phone</TableHead>
        <TableHead className="hidden md:table-cell">Seat</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead className="hidden lg:table-cell">Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingTableHeader;
