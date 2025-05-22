
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const usePaymentScreenshotUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = async (file: File) => {
    if (!file) return null;
    
    try {
      setIsUploading(true);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, file, { upsert: true });
        
      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(data?.path || "");
        
      toast.success("Screenshot uploaded successfully");
      
      return urlData?.publicUrl || null;
    } catch (error: any) {
      toast.error("Failed to upload screenshot", {
        description: error.message || "An unexpected error occurred"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    isUploading,
    handleUpload
  };
};
