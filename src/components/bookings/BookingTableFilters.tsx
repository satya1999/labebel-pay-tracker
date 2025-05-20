
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BookingTableFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BookingTableFilters = ({
  searchTerm,
  setSearchTerm,
}: BookingTableFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or seat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Trips</DropdownMenuItem>
            <DropdownMenuItem>Manali Adventure</DropdownMenuItem>
            <DropdownMenuItem>Goa Beach Vacation</DropdownMenuItem>
            <DropdownMenuItem>Kerala Backwaters Tour</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" asChild>
          <Link to="/bookings/new">Add Booking</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingTableFilters;
