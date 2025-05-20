
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BookingTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="whitespace-nowrap">SL.</TableHead>
        <TableHead className="whitespace-nowrap">Name</TableHead>
        <TableHead className="whitespace-nowrap">Adv.</TableHead>
        <TableHead className="whitespace-nowrap">Rest</TableHead>
        <TableHead className="whitespace-nowrap">D.</TableHead>
        <TableHead className="whitespace-nowrap">Cont.</TableHead>
        <TableHead className="whitespace-nowrap">Relativ. No.</TableHead>
        <TableHead className="whitespace-nowrap">Seat N</TableHead>
        <TableHead className="whitespace-nowrap">Payment</TableHead>
        <TableHead className="whitespace-nowrap">Via (Cash/UPI)</TableHead>
        <TableHead className="whitespace-nowrap">Rest / Full</TableHead>
        <TableHead className="whitespace-nowrap">A/C Name</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingTableHeader;
