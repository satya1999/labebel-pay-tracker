
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from './Header';
import { AppSidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Auto-collapse sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  // Show welcome toast on first render
  useEffect(() => {
    toast(
      "Welcome to Ananda Rath Payment Tracker", 
      {
        description: "Manage your travel bookings and payments efficiently",
        duration: 5000,
      }
    );
  }, []);

  return (
    <SidebarProvider
      defaultOpen={!isMobile}
      onOpenChange={setCollapsed}
    >
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        
        <div className="flex-1 flex w-full">
          <AppSidebar collapsed={collapsed} />
          
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8 bg-background transition-all duration-200 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
