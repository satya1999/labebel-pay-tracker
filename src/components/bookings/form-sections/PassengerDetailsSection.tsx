
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, IdCard, Users, MapPin, Cake } from 'lucide-react';
import { Control } from 'react-hook-form';
import FormSection from './FormSection';

interface PassengerDetailsSectionProps {
  control: Control<any>;
}

const PassengerDetailsSection = ({ control }: PassengerDetailsSectionProps) => {
  return (
    <FormSection title="Passenger Details">
      <FormField
        control={control}
        name="passengerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passenger Name</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Enter full name" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="contactNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Enter mobile number" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="aadharCardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Aadhar Card Number</FormLabel>
            <FormControl>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Enter Aadhar number" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="relativeContactNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relative Contact Number</FormLabel>
            <FormControl>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Optional emergency contact" {...field} />
              </div>
            </FormControl>
            <FormDescription>Optional emergency contact number</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Enter address" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <div className="relative">
                <Cake className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="number" className="pl-10" placeholder="Enter age" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="bloodGroup"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Blood Group</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};

export default PassengerDetailsSection;
