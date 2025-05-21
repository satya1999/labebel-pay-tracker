import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, FileText } from 'lucide-react';
import BookingTable from '@/components/bookings/BookingTable';
const BookingsList = () => {
  const [activeTab, setActiveTab] = useState("active");
  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF with booking data
    // For now, we'll just create a mock PDF download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Bookings Data'));
    element.setAttribute('download', 'bookings.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">
            Manage all your travel bookings and payments
          </p>
        </div>
        
        <div className="flex gap-2 self-start sm:self-center">
          <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 text-rose-700">
            <FileText className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
          
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/bookings/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Booking</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="active" className="flex-1 sm:flex-none data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900 text-danger-light">
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
    </div>;
};
export default BookingsList;