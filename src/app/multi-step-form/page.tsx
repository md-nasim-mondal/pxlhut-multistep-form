"use client";
import { FormProgress } from "@/components/FormProgress";
// import { PersonalInfoStep } from "@/components/form-steps/PersonalInfo";
// import { AddressDetailsStep } from "@/components/form-steps/AddressDetails";
// import { AccountSetupStep } from "@/components/form-steps/AccountSetup";
// import { SummaryStep } from "@/components/form-steps/Summary";
import { useMultiStepForm } from "@/lib/form-store";
import { FormProvider } from "react-hook-form";
import { FormNavigation } from "@/components/FormNavigation";

export default function MultiStepForm() {
  const { form, currentStep, nextStep, prevStep, submitForm, isSubmitting } = useMultiStepForm();
  const {
    register,
    formState: { errors },watch
  } = form;
  const password = watch('password');

  const formData = watch();
  console.log(formData);

  return (
    <div className='max-w-md mx-auto p-4 space-y-6'>
      <FormProgress />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          {/* {currentStep === 1 && <PersonalInfoStep />} */}
          {currentStep === 1 && (
            <div className='space-y-4'>
              <h2 className='text-xl font-bold'>Personal Information</h2>

              <div>
                <label className='block mb-1'>Full Name</label>
                <input
                  {...register("fullName")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.fullName && (
                  <p className='text-red-500 text-sm'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block mb-1'>Email</label>
                <input
                  type='email'
                  {...register("email")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className='block mb-1'>Phone Number</label>
                <input
                  type='tel'
                  {...register("phone")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.phone && (
                  <p className='text-red-500 text-sm'>{errors.phone.message}</p>
                )}
              </div>

              <FormNavigation onNext={nextStep} currentStep={currentStep} />
            </div>
          )}
          {/* {currentStep === 2 && <AddressDetailsStep />} */}
          {currentStep === 2 && (
            <div className='space-y-4'>
              <h2 className='text-xl font-bold'>Address Details</h2>

              <div>
                <label className='block mb-1'>Street Address</label>
                <input
                  {...register("streetAddress")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.streetAddress && (
                  <p className='text-red-500 text-sm'>
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block mb-1'>City</label>
                <input
                  {...register("city")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.city && (
                  <p className='text-red-500 text-sm'>{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className='block mb-1'>Zip Code</label>
                <input
                  {...register("zipCode")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.zipCode && (
                  <p className='text-red-500 text-sm'>
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <FormNavigation
                onNext={nextStep}
                onPrev={prevStep}
                currentStep={currentStep}
              />
            </div>
          )}
          {/* {currentStep === 3 && <AccountSetupStep />} */}
          {currentStep === 3 && (
            <div className='space-y-4'>
              <h2 className='text-xl font-bold'>Account Setup</h2>

              <div>
                <label className='block mb-1'>Username</label>
                <input
                  {...register("username")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.username && (
                  <p className='text-red-500 text-sm'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block mb-1'>Password</label>
                <input
                  type='password'
                  {...register("password")}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block mb-1'>Confirm Password</label>
                <input
                  type='password'
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className='w-full p-2 border rounded dark:bg-gray-700 dark:text-white'
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <FormNavigation
                onNext={nextStep}
                onPrev={prevStep}
                currentStep={currentStep}
              />
            </div>
          )}
          {/* {currentStep === 4 && <SummaryStep />} */}
          {currentStep === 4 && (
            <div className='space-y-6'>
              <h2 className='text-xl font-bold'>Review Your Information</h2>

              <div className='space-y-4'>
                <div>
                  <h3 className='font-medium'>Personal Info</h3>
                  <p>Name: {formData.fullName}</p>
                  <p>Email: {formData.email}</p>
                  <p>Phone: {formData.phone}</p>
                </div>

                <div>
                  <h3 className='font-medium'>Address</h3>
                  <p>Street: {formData.streetAddress}</p>
                  <p>City: {formData.city}</p>
                  <p>Zip: {formData.zipCode}</p>
                </div>

                <div>
                  <h3 className='font-medium'>Account</h3>
                  <p>Username: {formData.username}</p>
                </div>
              </div>

              <FormNavigation
                onSubmit={submitForm}
                currentStep={4}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
