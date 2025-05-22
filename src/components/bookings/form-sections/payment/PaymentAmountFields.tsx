
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';

interface PaymentAmountFieldsProps {
  control: Control<any>;
  remainingAmount: number;
}

const PaymentAmountFields = ({ control, remainingAmount }: PaymentAmountFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="totalAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Amount (₹)</FormLabel>
            <FormControl>
              <Input type="number" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="advancePaid"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Advance Paid (₹)</FormLabel>
            <FormControl>
              <Input type="number" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="discountGiven"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Given (₹)</FormLabel>
            <FormControl>
              <Input type="number" min={0} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div>
        <FormLabel>Remaining Amount (₹)</FormLabel>
        <div className="h-10 px-3 py-2 rounded-md border bg-slate-50 dark:bg-slate-900 flex items-center font-medium">
          {remainingAmount}
        </div>
        <FormDescription>
          Total amount minus advance paid and discount given
        </FormDescription>
      </div>
    </>
  );
};

export default PaymentAmountFields;
