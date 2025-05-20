
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, List, Calendar, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type NavItemProps = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  collapsed?: boolean;
};

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink 
          to={to} 
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent hover:text-accent-foreground"
            )
          }
        >
          <Icon className="h-4 w-4" />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Sidebar
      className={cn(
        "border-r bg-background transition-all",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem to="/" icon={BarChart} label="Dashboard" collapsed={collapsed} />
              <NavItem to="/bookings" icon={Book} label="Bookings" collapsed={collapsed} />
              <NavItem to="/trips" icon={Calendar} label="Trips" collapsed={collapsed} />
              <NavItem to="/reports" icon={List} label="Reports" collapsed={collapsed} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
