
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from './Header';
import { AppSidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider
      defaultOpen={!isMobile}
      collapsible="icon"
      onOpenChange={setCollapsed}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex w-full">
          <AppSidebar collapsed={collapsed} />
          
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
