
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from './Header';
import { AppSidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';

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
    toast({
      title: "Welcome to Labebel Payment Tracker",
      description: "Manage your travel bookings and payments efficiently",
      duration: 5000,
    });
  }, []);

  return (
    <SidebarProvider
      defaultOpen={!isMobile}
      onOpenChange={setCollapsed}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex w-full">
          <AppSidebar collapsed={collapsed} />
          
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 bg-background transition-all duration-200">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
