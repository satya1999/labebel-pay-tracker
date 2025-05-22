
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileImage, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Control } from 'react-hook-form';
import { usePaymentScreenshotUpload } from './usePaymentScreenshotUpload';

interface PaymentScreenshotUploaderProps {
  control: Control<any>;
}

const PaymentScreenshotUploader = ({ control }: PaymentScreenshotUploaderProps) => {
  const {
    isUploading,
    uploadedFile,
    uploadedUrl,
    uploadError,
    handleFileChange,
    handleRemoveFile
  } = usePaymentScreenshotUpload(control);

  return (
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
  );
};

export default PaymentScreenshotUploader;
