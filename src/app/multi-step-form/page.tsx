"use client";
import { FormProgress } from "@/components/FormProgress";
import { PersonalInfoStep } from "@/components/form-steps/PersonalInfo";
import { AddressDetailsStep } from "@/components/form-steps/AddressDetails";
import { AccountSetupStep } from "@/components/form-steps/AccountSetup";
import { SummaryStep } from "@/components/form-steps/Summary";
import { useFormStore } from "@/lib/form-store";

export default function MultiStepForm() {
  const { currentStep } = useFormStore();

  return (
    <div className='max-w-md mx-auto p-4 space-y-6'>
      <FormProgress />
      {currentStep === 1 && <PersonalInfoStep />}
      {currentStep === 2 && <AddressDetailsStep />}
      {currentStep === 3 && <AccountSetupStep />}
      {currentStep === 4 && <SummaryStep />}
    </div>
  );
}
