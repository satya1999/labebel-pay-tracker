
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

const BookingTableHeader = () => {
  return (
    <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
      <TableRow>
        <TableHead className="w-[60px] font-medium">ID</TableHead>
        <TableHead className="font-medium">Passenger</TableHead>
        <TableHead className="hidden md:table-cell font-medium">Seat</TableHead>
        <TableHead className="hidden lg:table-cell font-medium">Contact</TableHead>
        <TableHead className="hidden xl:table-cell font-medium">Aadhar</TableHead>
        <TableHead className="text-right font-medium">Adv. Amount</TableHead>
        <TableHead className="text-right hidden xl:table-cell font-medium">Rest Amount</TableHead>
        <TableHead className="hidden xl:table-cell font-medium">Status</TableHead>
        <TableHead className="text-right font-medium">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingTableHeader;
