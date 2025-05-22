
import React from 'react';
import { Control } from 'react-hook-form';
import FormSection from './FormSection';
import {
  PaymentAmountFields,
  PaymentMethodFields,
  PaymentScreenshotUploader,
  PaymentStatusToggles
} from './payment';

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
      <PaymentAmountFields control={control} remainingAmount={remainingAmount} />
      <PaymentMethodFields control={control} />
      <PaymentScreenshotUploader control={control} />
      <PaymentStatusToggles control={control} />
    </FormSection>
  );
};

export default PaymentInformationSection;
