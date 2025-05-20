
import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import CollectionChart from '@/components/dashboard/CollectionChart';
import RecentBookings from '@/components/dashboard/RecentBookings';
import { DashboardStats } from '@/types';

// Sample data - this would come from API in a real app
const dashboardStats: DashboardStats = {
  totalBookings: 156,
  totalAmountToBeCollected: 780000,
  collectedAmount: 560000,
  pendingAmount: 220000,
  todayCollections: 45000
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your booking and payment collection data
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Bookings" 
          value={dashboardStats.totalBookings} 
        />
        <StatsCard 
          title="Total Amount" 
          value={formatCurrency(dashboardStats.totalAmountToBeCollected)} 
        />
        <StatsCard 
          title="Collected Amount" 
          value={formatCurrency(dashboardStats.collectedAmount)} 
          className="border-l-4 border-green-500"
        />
        <StatsCard 
          title="Pending Amount" 
          value={formatCurrency(dashboardStats.pendingAmount)} 
          className="border-l-4 border-yellow-500"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <CollectionChart />
        <RecentBookings />
      </div>
    </div>
  );
};

export default Dashboard;
