'use client';

import { useMultiStepForm } from '@/lib/form-store';
import { FormNavigation } from '../FormNavigation';

export function AddressDetailsStep() {
  const { form, nextStep, prevStep, currentStep } = useMultiStepForm();
  const { register, formState: { errors } } = form;

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
          <p className="text-red-500 text-sm">{errors.streetAddress.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">City</label>
        <input
          {...register('city')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Zip Code</label>
        <input
          {...register('zipCode')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.zipCode && (
          <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
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