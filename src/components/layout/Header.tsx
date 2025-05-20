
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const userName = "Admin User"; // This would come from auth context in a real app
  const role = "admin"; // This would come from auth context in a real app

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-background px-4 shadow-sm">
      <div className="flex items-center gap-2 lg:hidden">
        <SidebarTrigger className="h-6 w-6" />
      </div>
      
      <div className="flex flex-1 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-primary">Labebel</span>
          <span className="hidden md:inline text-lg">Payment Tracker</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-6 w-6" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                  <p className="font-medium text-sm">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
