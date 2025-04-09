'use client';
import { FormNavigation } from '../FormNavigation';
import { useFormContext } from 'react-hook-form';

interface AccountSetupStepProps {
  nextStep?: () => void;
  prevStep?: () => void;
  currentStep: number;
}

export function AccountSetupStep({
  nextStep,
  prevStep,
  currentStep
}: AccountSetupStepProps) {
  const { register, formState: { errors }, watch } = useFormContext();
  const password = watch('password');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Account Setup</h2>
      
      <div>
        <label className="block mb-1">Username</label>
        <input
          {...register('username')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register('password')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message?.toString()}</p>
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