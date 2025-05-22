
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from 'react-hook-form';

interface PaymentStatusTogglesProps {
  control: Control<any>;
}

const PaymentStatusToggles = ({ control }: PaymentStatusTogglesProps) => {
  return (
    <>
      <FormField
        control={control}
        name="isPaymentCollected"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Payment Collected</FormLabel>
              <FormDescription>
                Mark if the payment has been collected
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
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Booking Cancelled</FormLabel>
              <FormDescription>
                Mark if the booking has been cancelled
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
    </>
  );
};

export default PaymentStatusToggles;
