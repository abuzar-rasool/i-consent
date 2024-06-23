'use client';
// pages/ConsentFormPage.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CheckboxInput } from '@/components/consent-form/create/CheckboxInput';
import { DateRangePicker } from '@/components/consent-form/create/DateRangePicker';
import { DurationSelect } from '@/components/consent-form/create/DurationSelect';
import { InstitutionSelect } from '@/components/consent-form/create/InstitutionSelect';
import { LanguageSelect } from '@/components/consent-form/create/LanguageSelect';
import { NumberInput } from '@/components/consent-form/create/NumberInput';
import { OtherInstitutionInput } from '@/components/consent-form/create/OtherInstitutionInput';
import { ResearchTypeSelect } from '@/components/consent-form/create/ResearchTypeSelect';
import { TextInput } from '@/components/consent-form/create/TextInput';


const formSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  otherInstitution: z.string().optional(),
  researchType: z.string().min(1, 'Research type is required'),
  language: z.string().min(1, 'Language is required'),
  title: z.string().min(1, 'Title is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  goal: z.string().min(1, 'Goal is required'),
  studyDateRange: z
    .object({
      from: z.date().nullable(),
      to: z.date().nullable()
    })
    .nullable(),
  duration: z.number().min(1, 'Duration is required'),
  durationUnit: z.string().min(1, 'Duration unit is required'),
  participants: z.number().min(1, 'Number of participants is required'),
  repeatedParticipation: z.boolean().optional(),
  uncomfortableQuestions: z.boolean().optional(),
  compensation: z.string().min(1, 'Compensation is required'),
  procedure: z
    .string()
    .array()
    .min(1, 'At least one procedure step is required'),
  dataCollected: z.object({
    demographics: z.boolean().default(false),
    contactData: z.boolean().default(false),
    userInput: z.boolean().default(false),
    manualNotes: z.boolean().default(false),
    screenCapture: z.boolean().default(false),
    physiologicalData: z.boolean().default(false),
    photos: z.boolean().default(false),
    audio: z.boolean().default(false),
    videos: z.boolean().default(false),
    motionTracking: z.boolean().default(false),
    bodyMetrics: z.boolean().default(false),
    eyeHeadMovements: z.boolean().default(false)
  }),
  dataDeletion: z.string().min(1, 'Data deletion time is required'),
  anonymization: z.string().min(1, 'Anonymization is required'),
  dataPublication: z.string().min(1, 'Data publication method is required'),
  principalInvestigator: z
    .string()
    .min(1, 'Principal investigator is required'),
  principalInvestigatorEmail: z.string().min(1, 'PI email is required'),
  researcherNames: z.string().optional(),
  researcherEmails: z.string().optional(),
  funding: z.string().optional(),
  ethicalCommittee: z.string().optional()
});

type ConsentFormInputs = z.infer<typeof formSchema>;

export default function ConsentFormPage() {
  const form = useForm<ConsentFormInputs>({
    resolver: zodResolver(formSchema)
  });
  const { control, handleSubmit } = form;
  const [showOtherInstitution, setShowOtherInstitution] = useState(false);

  const onSubmit: SubmitHandler<ConsentFormInputs> = (data) => {
    console.log(data);
  };

  const onError = (errors: any) => {
    const firstErrorField = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorField]?.message || 'An error occurred';
    alert(firstErrorMessage);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Consent Forms</h1>
      </div>
        <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>

          <InstitutionSelect control={control} setShowOtherInstitution={setShowOtherInstitution} />
          {showOtherInstitution && <OtherInstitutionInput control={control} />}
          <ResearchTypeSelect control={control} />
          <LanguageSelect control={control} />
          <TextInput control={control} name="title" label="Title of your Research" />
          <TextInput control={control} name="purpose" label="Explain the purpose (one sentence)" />
          <TextInput control={control} name="goal" label="Explain the goal (one sentence)" />
          <DateRangePicker control={control} />
          <NumberInput control={control} name="duration" label="Estimated trial duration" min={1} />
          <DurationSelect control={control} />
          <NumberInput control={control} name="participants" label="Estimated number of participants" min={1} />
          <CheckboxInput control={control} name="repeatedParticipation" label="Allow repeated participation" />
          <CheckboxInput control={control} name="uncomfortableQuestions" label="Interview questions" />
          <TextInput control={control} name="compensation" label="Compensation" />
          <TextInput control={control} name="procedure" label="Procedure (in 4-8 steps)" />
          <TextInput control={control} name="dataDeletion" label="When do you delete the raw data?" />
          <TextInput control={control} name="anonymization" label="Will you anonymize the raw data?" />
          <TextInput control={control} name="dataPublication" label="How will you make the data public?" />
          <TextInput control={control} name="principalInvestigator" label="Principal investigator (PI)" />
          <TextInput control={control} name="principalInvestigatorEmail" label="PI e-mail" />
          <TextInput control={control} name="researcherNames" label="Research student name(s)" />
          <TextInput control={control} name="researcherEmails" label="Research students e-mail(s)" />
          <TextInput control={control} name="funding" label="Funding project/organization" />
          <TextInput control={control} name="ethicalCommittee" label="Ethical committee/IRB" />
          <Button type="submit" className='mt-10 w-full'>Create Consent Form</Button>
          </form>
        </Form>
    </main>
  );
}
