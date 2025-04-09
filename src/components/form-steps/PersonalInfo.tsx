'use client';
import { FormNavigation } from '../FormNavigation';
import { useFormContext } from 'react-hook-form';

interface PersonalInfoStepProps {
  nextStep?: () => void;
  prevStep?: () => void;
  currentStep: number;
}

export function PersonalInfoStep({
  nextStep,
  prevStep,
  currentStep
}: PersonalInfoStepProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>
      
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          {...register('fullName')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.fullName?.message && (
          <p className="text-red-500 text-sm">{String(errors.fullName.message)}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.phone?.message && (
          <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>
        )}
      </div>

      <FormNavigation 
        onNext={nextStep} 
        onPrev={currentStep > 1 ? prevStep : undefined}
        currentStep={currentStep}
      />
    </div>
  );
}