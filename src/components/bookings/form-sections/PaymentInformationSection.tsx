
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from 'lucide-react';
import { Control } from 'react-hook-form';
import FormSection from './FormSection';

interface PaymentInformationSectionProps {
  control: Control<any>;
  remainingAmount: number;
}

const PaymentInformationSection = ({ 
  control, 
  remainingAmount 
}: PaymentInformationSectionProps) => {
  return (
    <FormSection title="Payment Information">
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
      
      <FormField
        control={control}
        name="paymentMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Mode</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="NEFT">NEFT</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="paymentTransferredTo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Transferred To</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                <SelectItem value="SBI Bank">SBI Bank</SelectItem>
                <SelectItem value="Axis Bank">Axis Bank</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
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
    </FormSection>
  );
};

export default PaymentInformationSection;
