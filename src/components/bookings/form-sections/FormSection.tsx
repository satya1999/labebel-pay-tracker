
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <Separator className="mb-6" />
      <div className="grid gap-6 md:grid-cols-2">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
