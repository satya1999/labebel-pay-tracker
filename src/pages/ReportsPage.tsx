
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const ReportsPage = () => {
  const handleExportExcel = () => {
    // In a real app, generate and download Excel file
    toast.success("Excel report is being generated");
  };
  
  const handleExportPDF = () => {
    // In a real app, generate and download PDF file
    toast.success("PDF report is being generated");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and download reports for your bookings and payments
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Reports</CardTitle>
            <CardDescription>
              Export detailed information about all your bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Trip</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select trip" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trips</SelectItem>
                  <SelectItem value="trip-1">Manali Adventure</SelectItem>
                  <SelectItem value="trip-2">Goa Beach Vacation</SelectItem>
                  <SelectItem value="trip-3">Kerala Backwaters Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Status</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="collected">Payment Collected</SelectItem>
                  <SelectItem value="pending">Payment Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" onClick={handleExportExcel}>
                Export Excel
              </Button>
              <Button className="flex-1" variant="outline" onClick={handleExportPDF}>
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>
              Generate a summary of all payment collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Collection Agent</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="agent-1">Agent 1</SelectItem>
                  <SelectItem value="agent-2">Agent 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" onClick={handleExportExcel}>
                Export Excel
              </Button>
              <Button className="flex-1" variant="outline" onClick={handleExportPDF}>
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
