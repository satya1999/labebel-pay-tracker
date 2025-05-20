
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import BookingTable from '@/components/bookings/BookingTable';

const BookingsList = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">
            Manage all your travel bookings and payments
          </p>
        </div>
        
        <Button asChild className="self-start sm:self-center">
          <Link to="/bookings/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Booking</span>
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="active" className="flex-1 sm:flex-none">Active Bookings</TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-1 sm:flex-none">Cancelled Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <BookingTable showCancelled={false} />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <BookingTable showCancelled={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsList;
