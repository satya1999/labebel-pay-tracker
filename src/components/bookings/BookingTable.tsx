
import React, { useState } from 'react';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import { Booking } from '@/types';
import BookingTableFilters from './BookingTableFilters';
import BookingTableHeader from './BookingTableHeader';
import BookingTableRow from './BookingTableRow';
import EmptyBookingState from './EmptyBookingState';

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
    updatedAt: '2023-05-15T10:30:00Z',
    bookingDate: '2023-05-14T10:30:00Z',
    aadharCardNumber: '1234 5678 9012',
    address: '123 Main St, Bangalore',
    age: 35,
    gender: 'M',
    bloodGroup: 'B+',
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
    updatedAt: '2023-05-16T15:45:00Z',
    bookingDate: '2023-05-15T09:15:00Z',
    aadharCardNumber: '9876 5432 1098',
    address: '456 Oak St, Delhi',
    age: 28,
    gender: 'F',
    bloodGroup: 'O+',
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
    updatedAt: '2023-05-17T11:45:00Z',
    bookingDate: '2023-05-16T11:45:00Z',
    aadharCardNumber: '5678 9012 3456',
    address: '789 Pine St, Mumbai',
    age: 42,
    gender: 'M',
    bloodGroup: 'A-',
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
    updatedAt: '2023-05-18T14:20:00Z',
    bookingDate: '2023-05-17T14:20:00Z',
    aadharCardNumber: '7890 1234 5678',
    address: '321 Elm St, Chennai',
    age: 31,
    gender: 'F',
    bloodGroup: 'AB+',
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
    updatedAt: '2023-05-19T16:30:00Z',
    bookingDate: '2023-05-18T08:45:00Z',
    aadharCardNumber: '2345 6789 0123',
    address: '654 Cedar St, Hyderabad',
    age: 39,
    gender: 'M',
    bloodGroup: 'B-',
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
        booking.seatNumber.toLowerCase().includes(searchLower) ||
        (booking.aadharCardNumber && booking.aadharCardNumber.includes(searchTerm))
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-4">
      <BookingTableFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <BookingTableHeader />
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <BookingTableRow 
                  key={booking.id}
                  booking={booking}
                  index={index} 
                />
              ))
            ) : (
              <EmptyBookingState />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingTable;
