
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from 'react-hook-form';
import FormSection from './FormSection';

interface AdditionalInformationSectionProps {
  control: Control<any>;
}

const AdditionalInformationSection = ({ control }: AdditionalInformationSectionProps) => {
  return (
    <FormSection title="Additional Information">
      <div className="md:col-span-2">
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any special notes or payment details"
                  className="resize-none min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
};

export default AdditionalInformationSection;
