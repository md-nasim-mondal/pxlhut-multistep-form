'use client';
import { useFormContext } from 'react-hook-form';
import { FormNavigation } from '../FormNavigation';
interface AddressDetailsStepProps {
  nextStep?: () => void;
  prevStep?: () => void;
  currentStep: number;
}

export function AddressDetailsStep({
  nextStep,
  prevStep,
  currentStep
}: AddressDetailsStepProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Address Details</h2>
      
      <div>
        <label className="block mb-1">Street Address</label>
        <input
          {...register('streetAddress')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.streetAddress && (
          <p className="text-red-500 text-sm">{errors.streetAddress.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">City</label>
        <input
          {...register('city')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Zip Code</label>
        <input
          {...register('zipCode')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.zipCode && (
          <p className="text-red-500 text-sm">{errors.zipCode.message?.toString()}</p>
        )}
      </div>

      <FormNavigation 
        onNext={nextStep} 
        onPrev={prevStep}
        currentStep={currentStep}
      />
    </div>
  );
}