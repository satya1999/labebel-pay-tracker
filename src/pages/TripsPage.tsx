
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Trip } from '@/types';

// Sample data - this would come from API in a real app
const TRIPS: Trip[] = [
  {
    id: 'trip-1',
    name: 'Manali Adventure',
    destination: 'Manali, Himachal Pradesh',
    departureDate: '2023-06-15T00:00:00Z',
    returnDate: '2023-06-22T00:00:00Z',
    price: 5000,
    totalSeats: 40
  },
  {
    id: 'trip-2',
    name: 'Goa Beach Vacation',
    destination: 'North Goa',
    departureDate: '2023-07-10T00:00:00Z',
    returnDate: '2023-07-15T00:00:00Z',
    price: 3500,
    totalSeats: 30
  },
  {
    id: 'trip-3',
    name: 'Kerala Backwaters Tour',
    destination: 'Alleppey, Kerala',
    departureDate: '2023-08-05T00:00:00Z',
    returnDate: '2023-08-12T00:00:00Z',
    price: 6000,
    totalSeats: 25
  }
];

const TripsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trips</h1>
          <p className="text-muted-foreground">
            Manage your tour trips and packages
          </p>
        </div>
        
        <Button variant="default">Add New Trip</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="hidden md:table-cell">Departure</TableHead>
              <TableHead className="hidden md:table-cell">Return</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Seats</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRIPS.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">{trip.name}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(trip.departureDate), 'dd MMM yyyy')}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(trip.returnDate), 'dd MMM yyyy')}
                </TableCell>
                <TableCell className="text-right">₹{trip.price}</TableCell>
                <TableCell className="text-center">{trip.totalSeats}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Bookings
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TripsPage;
