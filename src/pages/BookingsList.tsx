
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter } from 'lucide-react';
import BookingTable from '@/components/bookings/BookingTable';

const BookingsList = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">
            Manage all your travel bookings and payments
          </p>
        </div>
        
        <Button asChild className="self-start sm:self-center bg-purple-600 hover:bg-purple-700">
          <Link to="/bookings/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Booking</span>
          </Link>
        </Button>
      </div>
      
      <Tabs 
        defaultValue="active" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="active" className="flex-1 sm:flex-none data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-100">
              Active Bookings
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex-1 sm:flex-none data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900 dark:data-[state=active]:text-purple-100">
              Cancelled Bookings
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              Advanced Filters
            </Button>
          </div>
        </div>

        <TabsContent value="active" className="mt-0">
          <BookingTable showCancelled={false} />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-0">
          <BookingTable showCancelled={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsList;
