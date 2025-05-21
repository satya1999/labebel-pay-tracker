
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import FormSection from './FormSection';

interface SeatInformationSectionProps {
  control: Control<any>;
}

const SeatInformationSection = ({ control }: SeatInformationSectionProps) => {
  return (
    <FormSection title="Seat Information">
      <FormField
        control={control}
        name="seatNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seat Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g. A1, B2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};

export default SeatInformationSection;
