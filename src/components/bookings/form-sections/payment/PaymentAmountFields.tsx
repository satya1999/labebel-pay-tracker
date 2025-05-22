
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from 'lucide-react';
import { Control } from 'react-hook-form';

interface PaymentAmountFieldsProps {
  control: Control<any>;
  remainingAmount: number;
}

const PaymentAmountFields = ({ 
  control, 
  remainingAmount 
}: PaymentAmountFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="totalAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Amount</FormLabel>
            <FormControl>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" className="pl-10" {...field} />
              </div>
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
            <FormLabel>Advance Paid</FormLabel>
            <FormControl>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" className="pl-10" {...field} />
              </div>
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
            <FormLabel>Discount Given</FormLabel>
            <FormControl>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" className="pl-10" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div>
        <FormLabel>Remaining Amount</FormLabel>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            type="number" 
            value={remainingAmount} 
            disabled 
            className={`pl-10 bg-muted ${remainingAmount > 0 ? 'border-yellow-300 text-yellow-700' : 'border-green-300 text-green-700'}`}
          />
        </div>
        <FormDescription>Auto-calculated from total, advance, and discount</FormDescription>
      </div>
    </>
  );
};

export default PaymentAmountFields;
