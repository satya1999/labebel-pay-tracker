
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DollarSign, Upload, X, FileImage, CheckCircle, AlertCircle } from 'lucide-react';
import { Control } from 'react-hook-form';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import FormSection from './FormSection';

interface PaymentInformationSectionProps {
  control: Control<any>;
  remainingAmount: number;
}

const PaymentInformationSection = ({ 
  control, 
  remainingAmount 
}: PaymentInformationSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit');
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setUploadError(null);
    
    // Upload the file
    try {
      setIsUploading(true);
      
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const { data, error } = await supabase.storage
        .from('payment_screenshots')
        .upload(fileName, file);

      if (error) {
        throw error;
      }
      
      if (data) {
        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('payment_screenshots')
          .getPublicUrl(data.path);
        
        setUploadedUrl(publicUrl);
        
        // Update the form with the URL
        control._formValues.screenshotUrl = publicUrl;
        
        toast({
          title: "Upload Successful",
          description: "Payment screenshot uploaded successfully",
        });
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(error.message);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadedUrl(null);
    setUploadError(null);
    
    // Clear the form value
    control._formValues.screenshotUrl = null;
  };

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

      <FormField
        control={control}
        name="screenshotUrl"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Payment Screenshot</FormLabel>
            <FormControl>
              <div className="border-2 border-dashed rounded-lg p-4 relative">
                {!uploadedFile && !uploadedUrl && (
                  <div className="text-center">
                    <FileImage className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Upload a screenshot of payment confirmation</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="relative"
                        disabled={isUploading}
                      >
                        {isUploading ? "Uploading..." : "Select Image"}
                        <Input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                      </Button>
                    </div>
                  </div>
                )}

                {(uploadedFile || uploadedUrl) && !uploadError && (
                  <div className="text-center">
                    <div className="relative mb-2">
                      {uploadedUrl && (
                        <img 
                          src={uploadedUrl} 
                          alt="Payment screenshot" 
                          className="max-h-40 mx-auto object-contain rounded-md"
                        />
                      )}
                      {!uploadedUrl && uploadedFile && (
                        <div className="bg-muted p-4 rounded-md text-center">
                          <FileImage className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">{uploadedFile.name}</p>
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 rounded-full bg-destructive/10 hover:bg-destructive/20"
                        onClick={handleRemoveFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Screenshot uploaded successfully</span>
                    </div>
                  </div>
                )}

                {uploadError && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{uploadError}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="relative mt-2"
                    >
                      Try Again
                      <Input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                )}
                <Input type="hidden" {...field} />
              </div>
            </FormControl>
            <FormDescription>
              Upload a screenshot of payment confirmation (max 5MB)
            </FormDescription>
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
