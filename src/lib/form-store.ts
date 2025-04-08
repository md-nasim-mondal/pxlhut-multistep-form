import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { z } from 'zod';
import { baseFormSchema, formSchema, type FormData } from './schemas';

// Define precise schema types for each step
type PersonalInfoKeys = { fullName: true; email: true; phone: true };
type AddressKeys = { streetAddress: true; city: true; zipCode: true };
type AccountKeys = { username: true; password: true; confirmPassword: true };

type PersonalInfoSchema = ReturnType<typeof baseFormSchema.pick<PersonalInfoKeys>>;
type AddressSchema = ReturnType<typeof baseFormSchema.pick<AddressKeys>>;
type AccountSchema = ReturnType<typeof baseFormSchema.pick<AccountKeys>>;
type StepSchema = PersonalInfoSchema | AddressSchema | AccountSchema;

type FormErrors = Partial<Record<keyof FormData, string>>;

type FormStore = {
  currentStep: number;
  formData: Partial<FormData>;
  errors: FormErrors;
  setCurrentStep: (step: number) => void;
  updateFormData: <K extends keyof FormData>(data: Pick<FormData, K> | FormData) => void;
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
          // Clear errors for updated fields
          errors: Object.fromEntries(
            Object.entries(state.errors).filter(([key]) => !(key in data))
          )
        })),

      setErrors: (errors) => set({ errors }),

      validateStep: (step) => {
        const { formData } = get();
        let stepSchema: StepSchema;

        switch (step) {
          case 1:
            stepSchema = baseFormSchema.pick({ fullName: true, email: true, phone: true });
            break;
          case 2:
            stepSchema = baseFormSchema.pick({ streetAddress: true, city: true, zipCode: true });
            break;
          case 3:
            stepSchema = baseFormSchema.pick({ username: true, password: true, confirmPassword: true });
            break;
          default:
            return true;
        }

        const result = stepSchema.safeParse(formData);
        if (!result.success) {
          const newErrors: FormErrors = {};
          result.error.errors.forEach((err) => {
            const fieldName = err.path[0] as keyof FormData;
            newErrors[fieldName] = err.message;
          });
          set({ errors: { ...get().errors, ...newErrors } });
          return false;
        }

        // Clear only current step errors when valid
        const validFields = Object.keys(stepSchema.shape) as (keyof FormData)[];
        const filteredErrors = Object.fromEntries(
          Object.entries(get().errors).filter(([key]) => !validFields.includes(key as keyof FormData))
        ) as FormErrors;
        
        set({ errors: filteredErrors });
        return true;
      },

      validateForm: () => {
        const result = formSchema.safeParse(get().formData);
        if (!result.success) {
          const newErrors: FormErrors = {};
          result.error.errors.forEach((err) => {
            const fieldName = err.path[0] as keyof FormData;
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

// Utility function to get default form values
export function getDefaultFormValues(): FormData {
  return Object.keys(baseFormSchema.shape).reduce((acc, key) => {
    return { ...acc, [key]: '' };
  }, {} as FormData);
}