'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';

const checkboxSchema = z.object({
  consentGranted: z.boolean().refine((value) => value === true, {
    message: 'You must agree to participate in the study'
  })
});

type CheckBoxFormInputs = z.infer<typeof checkboxSchema>;

interface CheckBoxFormProps {
  onSubmit: SubmitHandler<CheckBoxFormInputs>;
}

const CheckBoxForm: React.FC<CheckBoxFormProps> = ({ onSubmit }) => {
  const form = useForm<CheckBoxFormInputs>({
    resolver: zodResolver(checkboxSchema),
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label>
            <input type="checkbox" {...register('consentGranted')} />
            I have read and understood the information provided and agree to participate in this study.
          </label>
          {errors.consentGranted && (
            <FormMessage>{errors.consentGranted.message}</FormMessage>
          )}
        </div>

        <Button type="submit" className="mt-10 w-full">
          Submit Consent
        </Button>
      </form>
    </Form>
  );
};

export default CheckBoxForm;
