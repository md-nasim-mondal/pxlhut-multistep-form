'use client';

type FormNavigationProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  currentStep?: number;
  isSubmitting?: boolean;
};

export function FormNavigation({ 
  onNext, 
  onPrev, 
  onSubmit, 
  currentStep = 1,
  isSubmitting = false 
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && onPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          Previous
        </button>
      )}
      
      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Next
        </button>
      ) : (
        <button
          type={onSubmit ? "button" : "submit"}
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      )}
    </div>
  );
}