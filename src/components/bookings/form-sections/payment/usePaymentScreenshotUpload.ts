
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Control } from 'react-hook-form';

export interface UsePaymentScreenshotUploadResult {
  isUploading: boolean;
  uploadedFile: File | null;
  uploadedUrl: string | null;
  uploadError: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveFile: () => void;
}

export const usePaymentScreenshotUpload = (
  control: Control<any>
): UsePaymentScreenshotUploadResult => {
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
      toast.error("Invalid file type", {
        description: "Please upload an image file (JPEG, PNG, etc.)"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit');
      toast.error("File too large", {
        description: "Maximum file size is 5MB"
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
        
        toast.success("Upload Successful", {
          description: "Payment screenshot uploaded successfully"
        });
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(error.message);
      toast.error("Upload failed", {
        description: error.message
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

  return {
    isUploading,
    uploadedFile,
    uploadedUrl,
    uploadError,
    handleFileChange,
    handleRemoveFile
  };
};
