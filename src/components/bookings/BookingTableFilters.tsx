
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row gap-2 justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search by name, phone, or seat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Trips</DropdownMenuItem>
            <DropdownMenuItem>Trip 1</DropdownMenuItem>
            <DropdownMenuItem>Trip 2</DropdownMenuItem>
            <DropdownMenuItem>Trip 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default" asChild>
          <Link to="/bookings/new">Add Booking</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingTableFilters;
