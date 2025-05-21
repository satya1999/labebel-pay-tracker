
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar } from 'lucide-react';
import { format } from "date-fns";
import { Control } from 'react-hook-form';
import FormSection from './FormSection';

interface BookingDetailsSectionProps {
  control: Control<any>;
}

const BookingDetailsSection = ({ control }: BookingDetailsSectionProps) => {
  return (
    <FormSection title="Booking Details">
      <FormField
        control={control}
        name="bookingDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Booking Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal flex justify-between items-center"
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <Calendar className="h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};

export default BookingDetailsSection;
