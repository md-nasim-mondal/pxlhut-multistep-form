import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { baseFormSchema, formSchema, type FormData } from './schemas';

// Step configuration with precise typing
const STEP_VALIDATIONS = {
  1: ['fullName', 'email', 'phone'] as const,
  2: ['streetAddress', 'city', 'zipCode'] as const,
  3: ['username', 'password', 'confirmPassword'] as const,
};

type StepKey = keyof typeof STEP_VALIDATIONS;
type FieldName = keyof FormData;

type FormErrors = Partial<Record<FieldName, string>>;

type FormStore = {
  currentStep: number;
  formData: Partial<FormData>;
  errors: FormErrors;
  setCurrentStep: (step: number) => void;
  updateFormData: <K extends FieldName>(data: Pick<FormData, K> | FormData) => void;
  setErrors: (errors: FormErrors) => void;
  validateStep: (step: number) => boolean;
  validateForm: () => boolean;
  clearStore: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: {},
      errors: {},

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
          errors: Object.fromEntries(
            Object.entries(state.errors).filter(([key]) => !(key in data))
          ),
        })),

      setErrors: (errors) => set({ errors }),

      validateStep: (step) => {
        const { formData } = get();
        const fields = STEP_VALIDATIONS[step as StepKey];
        
        if (!fields) return true;

        // Create type-safe pick object
        const pickFields = fields.reduce((acc, field) => {
          acc[field as FieldName] = true;
          return acc;
        }, {} as { [K in FieldName]?: true });

        const stepSchema = baseFormSchema.pick(pickFields);
        const result = stepSchema.safeParse(formData);

        if (!result.success) {
          const newErrors: FormErrors = {};
          result.error.errors.forEach((err) => {
            const fieldName = err.path[0] as FieldName;
            newErrors[fieldName] = err.message;
          });
          set({ errors: { ...get().errors, ...newErrors } });
          return false;
        }

        // Type-safe error filtering using Set
        const fieldSet = new Set(fields);
        const filteredErrors = Object.fromEntries(
          Object.entries(get().errors).filter(([key]) => 
            !fieldSet.has(key as FieldName))
        ) as FormErrors;
        
        set({ errors: filteredErrors });
        return true;
      },

      validateForm: () => {
        const result = formSchema.safeParse(get().formData);
        if (!result.success) {
          const newErrors: FormErrors = {};
          result.error.errors.forEach((err) => {
            const fieldName = err.path[0] as FieldName;
            newErrors[fieldName] = err.message;
          });
          set({ errors: newErrors });
          return false;
        }
        set({ errors: {} });
        return true;
      },

      clearStore: () => set({ 
        currentStep: 1, 
        formData: {}, 
        errors: {} 
      }),
    }),
    {
      name: 'multi-step-form-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);

// Utility function with proper return type
export function getDefaultFormValues(): FormData {
  return {
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
}