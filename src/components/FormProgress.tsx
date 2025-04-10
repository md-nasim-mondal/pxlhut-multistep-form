"use client";

import { useFormStore } from "@/lib/form-store";

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Address" },
  { id: 3, name: "Account" },
  { id: 4, name: "Review" },
];

export function FormProgress() {
  const { currentStep } = useFormStore();

  return (
    <div className='flex justify-between mb-8 relative'>
      {/* Progress line */}
      <div className='absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600 -z-10'>
        <div
          className='h-full bg-blue-500 dark:bg-blue-600 transition-all duration-300'
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {steps.map((step) => (
        <div key={step.id} className='flex flex-col items-center z-10'>
          <div
            className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${
              currentStep > step.id
                ? "bg-green-500 dark:bg-green-600"
                : currentStep === step.id
                ? "bg-blue-500 dark:bg-blue-600"
                : "bg-gray-200 dark:bg-gray-500"
            }
            ${
              currentStep >= step.id
                ? "text-white"
                : "text-gray-600 dark:text-gray-300"
            }
          `}>
            {currentStep > step.id ? (
              <CheckIcon />
            ) : (
              <span className='font-medium'>{step.id}</span>
            )}
          </div>
          <span
            className={`
            text-sm mt-2 text-center
            ${
              currentStep >= step.id
                ? "font-medium text-gray-800 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }
          `}>
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// Small check icon component
function CheckIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polyline points='20 6 9 17 4 12'></polyline>
    </svg>
  );
}
