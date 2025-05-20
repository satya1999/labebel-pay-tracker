
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingTable from '@/components/bookings/BookingTable';

const BookingsList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">
          Manage all your travel bookings and payments
        </p>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Bookings</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled Bookings</TabsTrigger>
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
