"use client";
import { FormProgress } from "@/components/FormProgress";
import { PersonalInfoStep } from "@/components/form-steps/PersonalInfo";
import { AddressDetailsStep } from "@/components/form-steps/AddressDetails";
import { AccountSetupStep } from "@/components/form-steps/AccountSetup";
import { SummaryStep } from "@/components/form-steps/Summary";
import { useMultiStepForm } from "@/lib/form-store";
import { FormProvider } from "react-hook-form";

export default function MultiStepForm() {
  const { currentStep, form, nextStep, prevStep, submitForm, isSubmitting } =
    useMultiStepForm();
  const { handleSubmit, watch } = form;

  console.log(watch());

  return (
    <div className='max-w-md mx-auto p-4 space-y-6'>
      <FormProgress />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          {currentStep === 1 && (
            <PersonalInfoStep
              nextStep={nextStep}
              prevStep={prevStep}
              currentStep={currentStep}
            />
          )}
          {currentStep === 2 && (
            <AddressDetailsStep
              nextStep={nextStep}
              prevStep={prevStep}
              currentStep={currentStep}
            />
          )}
          {currentStep === 3 && (
            <AccountSetupStep
              nextStep={nextStep}
              prevStep={prevStep}
              currentStep={currentStep}
            />
          )}
          {currentStep === 4 && (
            <SummaryStep
              submitForm={submitForm}
              isSubmitting={isSubmitting}
              currentStep={currentStep}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}
