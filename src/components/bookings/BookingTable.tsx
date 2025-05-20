
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Booking } from '@/types';
import { Search } from 'lucide-react';

// Sample data - this would come from API in real app
const BOOKINGS: Booking[] = [
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
  {
    id: '4',
    tripId: 'trip-3',
    passengerName: 'Sarah Johnson',
    contactNumber: '9856743210',
    seatNumber: 'D2',
    advancePaid: 2500,
    remainingAmount: 2500,
    discountGiven: 0,
    paymentMode: 'NEFT',
    paymentTransferredTo: 'Axis Bank',
    isCancelled: false,
    isPaymentCollected: false,
    totalAmount: 5000,
    createdAt: '2023-05-18T14:20:00Z',
    updatedAt: '2023-05-18T14:20:00Z'
  },
  {
    id: '5',
    tripId: 'trip-2',
    passengerName: 'Michael Wilson',
    contactNumber: '8976543210',
    seatNumber: 'A4',
    advancePaid: 3500,
    remainingAmount: 0,
    discountGiven: 0,
    paymentMode: 'UPI',
    paymentTransferredTo: 'HDFC Bank',
    isCancelled: false,
    isPaymentCollected: true,
    totalAmount: 3500,
    createdAt: '2023-05-19T08:45:00Z',
    updatedAt: '2023-05-19T16:30:00Z'
  },
];

interface BookingTableProps {
  showCancelled?: boolean;
}

const BookingTable = ({ showCancelled = false }: BookingTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBookings = BOOKINGS.filter(booking => {
    // Filter by cancelled status
    if (booking.isCancelled !== showCancelled) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        booking.passengerName.toLowerCase().includes(searchLower) ||
        booking.contactNumber.includes(searchTerm) ||
        booking.seatNumber.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search by name, phone, or seat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Trips</DropdownMenuItem>
              <DropdownMenuItem>Trip 1</DropdownMenuItem>
              <DropdownMenuItem>Trip 2</DropdownMenuItem>
              <DropdownMenuItem>Trip 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="default" asChild>
            <Link to="/bookings/new">Add Booking</Link>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Passenger</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Seat</TableHead>
              <TableHead className="hidden lg:table-cell">Payment Mode</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.passengerName}</TableCell>
                  <TableCell className="hidden md:table-cell">{booking.contactNumber}</TableCell>
                  <TableCell>{booking.seatNumber}</TableCell>
                  <TableCell className="hidden lg:table-cell">{booking.paymentMode}</TableCell>
                  <TableCell className="text-right">
                    <div>₹{booking.totalAmount}</div>
                    <div className="text-xs text-muted-foreground">
                      Paid: ₹{booking.advancePaid}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/bookings/${booking.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingTable;
