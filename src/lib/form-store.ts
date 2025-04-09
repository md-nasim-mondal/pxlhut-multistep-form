import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormData } from './schemas';
import { useMutation } from '@tanstack/react-query';

type FormStore = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () => set({ currentStep: 1 }),
    }),
    { name: 'form-storage' }
  )
);

const submitFormData = async (data: FormData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, data };
};

export function useMultiStepForm() {
  const { currentStep, setCurrentStep, resetForm } = useFormStore();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      resetForm();
    },
  });

  const validateCurrentStep = async () => {
    const stepFields = {
      1: ['fullName', 'email', 'phone'],
      2: ['streetAddress', 'city', 'zipCode'],
      3: ['username', 'password', 'confirmPassword']
    };

    const fields = stepFields[currentStep as keyof typeof stepFields];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await form.trigger(fields as any);
  };

  const nextStep = async () => {
    if (await validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const submitForm = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { 
    form, 
    currentStep, 
    nextStep, 
    prevStep, 
    submitForm,
    isSubmitting: mutation.isPending 
  };
}