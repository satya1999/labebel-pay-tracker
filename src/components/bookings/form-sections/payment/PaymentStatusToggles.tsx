
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from 'react-hook-form';

interface PaymentStatusTogglesProps {
  control: Control<any>;
}

const PaymentStatusToggles = ({ control }: PaymentStatusTogglesProps) => {
  return (
    <div className="md:col-span-2 grid gap-6 md:grid-cols-2 mt-6">
      <FormField
        control={control}
        name="isPaymentCollected"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Payment Collected</FormLabel>
              <FormDescription>
                Mark if payment has been fully collected
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="isCancelled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Cancelled</FormLabel>
              <FormDescription>
                Mark if this booking has been cancelled
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentStatusToggles;
