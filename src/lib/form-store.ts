import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./schemas";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type FormStore = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  clearStore: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      clearStore: () => set({ currentStep: 1 }),
    }),
    { name: "form-storage" }
  )
);

// API simulation function
const submitFormData = async (data: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, data };
};

type StepFields = {
  1: ["fullName", "email", "phone"];
  2: ["streetAddress", "city", "zipCode"];
  3: ["username", "password", "confirmPassword"];
};

export function useMultiStepForm() {
  const { currentStep, setCurrentStep, clearStore } = useFormStore();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form"] });
      clearStore();
    },
  });

  const validateCurrentStep = async () => {
    const stepFields: StepFields = {
      1: ["fullName", "email", "phone"],
      2: ["streetAddress", "city", "zipCode"],
      3: ["username", "password", "confirmPassword"],
    };

    const fields = stepFields[currentStep as keyof StepFields];
    return await form.trigger(fields);
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
    isSubmitting: mutation.isPending,
  };
}
