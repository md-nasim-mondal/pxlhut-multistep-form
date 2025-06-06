"use client";
import { FormNavigation } from "../FormNavigation";
import { useFormContext } from "react-hook-form";
interface SummaryStepProps {
  submitForm?: () => void;
  isSubmitting?: boolean;
  currentStep: number;
}

export function SummaryStep({ submitForm, isSubmitting }: SummaryStepProps) {
  const { watch } = useFormContext();

  const formData = watch();

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold'>Review Your Information</h2>

      <div className='space-y-4'>
        <div>
          <h3 className='font-medium'>Personal Info</h3>
          <p>Name: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
        </div>

        <div>
          <h3 className='font-medium'>Address</h3>
          <p>Street: {formData.streetAddress}</p>
          <p>City: {formData.city}</p>
          <p>Zip: {formData.zipCode}</p>
        </div>

        <div>
          <h3 className='font-medium'>Account</h3>
          <p>Username: {formData.username}</p>
        </div>
      </div>

      <FormNavigation
        onSubmit={submitForm}
        currentStep={4}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
