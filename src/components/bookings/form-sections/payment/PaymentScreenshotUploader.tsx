
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from 'lucide-react';
import { Control, useWatch } from 'react-hook-form';
import { usePaymentScreenshotUpload } from './usePaymentScreenshotUpload';

interface PaymentScreenshotUploaderProps {
  control: Control<any>;
}

const PaymentScreenshotUploader = ({ control }: PaymentScreenshotUploaderProps) => {
  const { isUploading, handleUpload } = usePaymentScreenshotUpload();
  const screenshotUrl = useWatch({ control, name: 'screenshotUrl' });
  const [previewUrl, setPreviewUrl] = useState<string | null>(screenshotUrl);
  
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create a preview
    setPreviewUrl(URL.createObjectURL(file));
    
    // Upload the file
    const uploadedUrl = await handleUpload(file);
    if (uploadedUrl) {
      onChange(uploadedUrl);
    }
  };
  
  const handleRemove = (onChange: (value: null) => void) => {
    setPreviewUrl(null);
    onChange(null);
  };
  
  return (
    <div className="col-span-2">
      <FormField
        control={control}
        name="screenshotUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Screenshot</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {!previewUrl ? (
                  <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="payment-screenshot"
                      onChange={(e) => handleFileChange(e, field.onChange)}
                      disabled={isUploading}
                    />
                    <label 
                      htmlFor="payment-screenshot" 
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-500">
                        {isUploading ? "Uploading..." : "Click to upload payment screenshot"}
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Payment screenshot" 
                      className="max-h-64 rounded-lg mx-auto"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemove(field.onChange)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Upload a screenshot of the payment confirmation (optional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentScreenshotUploader;
