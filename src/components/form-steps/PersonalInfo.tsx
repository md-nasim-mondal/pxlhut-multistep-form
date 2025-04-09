'use client';
import { useMultiStepForm } from '@/lib/form-store';
import { FormNavigation } from '../FormNavigation';

export function PersonalInfoStep() {
  const { form, nextStep, currentStep } = useMultiStepForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>
      
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          {...register('fullName')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <FormNavigation 
        onNext={nextStep} 
        currentStep={currentStep}
      />
    </div>
  );
}