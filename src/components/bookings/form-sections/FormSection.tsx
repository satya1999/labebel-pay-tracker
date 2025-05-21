
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <h3 className="text-lg font-medium mb-3 text-purple-800 dark:text-purple-300">{title}</h3>
      <Separator className="mb-6 bg-purple-100 dark:bg-purple-900/30" />
      <div className="grid gap-6 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
