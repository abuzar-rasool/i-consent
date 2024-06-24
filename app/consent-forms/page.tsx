'use client';

import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray
} from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/data-range-picker';

const stringValidation = (fieldName: string) =>
  z
    .string({ message: `${fieldName} is required` })
    .min(1, `${fieldName} is required`);

const numberValidation = (fieldName: string) =>
  z
    .number({ message: `${fieldName} is required` })
    .min(1, `${fieldName} is required`);

const formSchema = z.object({
  institution: stringValidation('Institution'),
  otherInstitution: z.string().optional(),
  researchType: stringValidation('Research type'),
  language: stringValidation('Language'),
  title: stringValidation('Title'),
  purpose: stringValidation('Purpose'),
  goal: stringValidation('Goal'),
  studyDateRange: z
    .object({
      from: z.date().nullable(),
      to: z.date().nullable()
    })
    .nullable(),
  duration: numberValidation('Duration'),
  durationUnit: stringValidation('Duration unit'),
  participants: numberValidation('Number of participants'),
  repeatedParticipation: z.boolean().optional(),
  uncomfortableQuestions: z.boolean().optional(),
  compensation: stringValidation('Compensation'),
  procedure: z
    .array(
      z
        .string({ message: 'Procedure step is required' })
        .refine((value) => value.trim().length > 0, {
          message: 'Procedure step is required'
        })
    )
    .min(1, { message: 'At least one procedure step is required' })
    .max(4, { message: 'No more than 4 procedure steps are allowed' }),
  dataCollected: z
    .object({
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
    })
    .refine(
      (value) => {
        return value.demographics;
      },
      { message: 'Demographics is required' }
    ),
  dataDeletion: stringValidation('Data deletion time'),
  anonymization: stringValidation('Anonymization method'),
  dataPublication: stringValidation('Data publication'),
  principalInvestigator: z
    .string({ message: 'Principal investigator is required' })
    .min(1, 'Principal investigator is required'),
  principalInvestigatorEmail: stringValidation('Principal investigator email'),
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
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'procedure' as never
  });

  const [showOtherInstitution, setShowOtherInstitution] = useState(false);
  const onSubmit: SubmitHandler<ConsentFormInputs> = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Consent Forms</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:gap-8 md:p-6 bg-white rounded-lg shadow-md"
      >
        <Form {...form}>
          <FormItem>
            <FormLabel>Your Institution</FormLabel>
            <FormField
              name="institution"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowOtherInstitution(value === 'other');
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frauas">
                        Frankfurt University of Applied Sciences
                      </SelectItem>
                      <SelectItem value="regensburg">
                        University of Regensburg
                      </SelectItem>
                      <SelectItem value="stuttgart">
                        University of Stuttgart
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.institution && (
              <FormMessage>{errors.institution.message}</FormMessage>
            )}
          </FormItem>
          {showOtherInstitution && (
            <FormItem>
              <FormLabel>Other Institution</FormLabel>
              <Controller
                name="otherInstitution"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your Institution, Streetname 123, ZIP City, Country"
                    />
                  </FormControl>
                )}
              />
              {errors.institution && (
                <FormMessage>{errors.institution.message}</FormMessage>
              )}
            </FormItem>
          )}
          <FormItem>
            <FormLabel>Kind of research</FormLabel>
            <Controller
              name="researchType"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onlinestudy">Online study</SelectItem>
                      <SelectItem value="userstudy">User Study</SelectItem>
                      <SelectItem value="fieldstudy">Field Study</SelectItem>
                      <SelectItem value="qualitativestudy">
                        Interview
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.researchType && (
              <FormMessage>{errors.researchType.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Informed Consent Language</FormLabel>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.language && (
              <FormMessage>{errors.language.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Title of your Research</FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
            {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Explain the purpose (one sentence)</FormLabel>
            <Controller
              name="purpose"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
            {errors.purpose && (
              <FormMessage>{errors.purpose.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Explain the goal (one sentence)</FormLabel>
            <Controller
              name="goal"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
            {errors.goal && <FormMessage>{errors.goal.message}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Estimated study date range</FormLabel>
            <Controller
              name="studyDateRange"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <DatePickerWithRange
                    value={field.value as any}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
            {errors.studyDateRange && (
              <FormMessage>{errors.studyDateRange.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Estimated trial duration</FormLabel>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} type="number" min="1" />
                </FormControl>
              )}
            />
            <Controller
              name="durationUnit"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.duration && (
              <FormMessage>{errors.duration.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Estimated number of participants</FormLabel>
            <Controller
              name="participants"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} type="number" min="1" />
                </FormControl>
              )}
            />
            {errors.participants && (
              <FormMessage>{errors.participants.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Study options</FormLabel>
            <Controller
              name="repeatedParticipation"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="repeatedParticipation"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="repeatedParticipation"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow repeated participation
                  </label>
                </div>
              )}
            />
            <Controller
              name="uncomfortableQuestions"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uncomfortableQuestions"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="uncomfortableQuestions"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Interview questions
                  </label>
                </div>
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Compensation</FormLabel>
            <Controller
              name="compensation"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="1EUR">1 EUR</SelectItem>
                      <SelectItem value="5EUR">5 EUR</SelectItem>
                      <SelectItem value="10EUR">10 EUR</SelectItem>
                      <SelectItem value="15EUR">15 EUR</SelectItem>
                      <SelectItem value="20EUR">20 EUR</SelectItem>
                      <SelectItem value="halfcredit">½ credit point</SelectItem>
                      <SelectItem value="onecredit">1 credit point</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.compensation && (
              <FormMessage>{errors.compensation.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Procedure (up to 4 steps)</FormLabel>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Controller
                  name={`procedure.${index}`}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <Input {...field} placeholder={`Step ${index + 1}`} />
                    </FormControl>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  Remove
                </Button>
                <div className="w-4/5">
                  <FormMessage>
                    {errors.procedure?.[index]?.message}
                  </FormMessage>
                </div>
              </div>
            ))}
            <Button
              type="button"
              className="m-2"
              onClick={() => append('')}
              disabled={fields.length >= 4}
            >
              Add Step
            </Button>
            {errors.procedure && (
              <FormMessage>{errors.procedure.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Collected data</FormLabel>
            <Controller
              name="dataCollected"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dataCollected.demographics"
                      checked={field.value?.demographics}
                      onCheckedChange={() =>
                        field.onChange({
                          ...field.value,
                          demographics: !field.value?.demographics
                        })
                      }
                    />
                    <label
                      htmlFor="dataCollected.demographics"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Demographics
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dataCollected.contactData"
                      checked={field.value?.contactData}
                      onCheckedChange={() =>
                        field.onChange({
                          ...field.value,
                          contactData: !field.value?.contactData
                        })
                      }
                    />
                    <label
                      htmlFor="dataCollected.contactData"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Contact data (E-Mails)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dataCollected.userInput"
                      checked={field.value?.userInput}
                      onCheckedChange={() =>
                        field.onChange({
                          ...field.value,
                          userInput: !field.value?.userInput
                        })
                      }
                    />
                    <label
                      htmlFor="dataCollected.userInput"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      User input
                    </label>
                  </div>
                  {/* Add other collected data checkboxes similarly */}
                </>
              )}
            />
            {errors.dataCollected && (
              <FormMessage>{errors.dataCollected.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>When do you delete the raw data?</FormLabel>
            <Controller
              name="dataDeletion"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">After 1 year</SelectItem>
                      <SelectItem value="2years">After 2 years</SelectItem>
                      <SelectItem value="3years">After 3 years</SelectItem>
                      <SelectItem value="4years">After 4 years</SelectItem>
                      <SelectItem value="5years">After 5 years</SelectItem>
                      <SelectItem value="10years">After 10 years</SelectItem>
                      <SelectItem value="15years">After 15 years</SelectItem>
                      <SelectItem value="20years">After 20 years</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.dataDeletion && (
              <FormMessage>{errors.dataDeletion.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Will you anonymize the raw data?</FormLabel>
            <Controller
              name="anonymization"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No - not anonymized</SelectItem>
                      <SelectItem value="pseudo">
                        Yes - pseudoanonymized (recommended)
                      </SelectItem>
                      <SelectItem value="full">
                        Yes - fully anonymized
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.anonymization && (
              <FormMessage>{errors.anonymization.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>How will you make the data public?</FormLabel>
            <Controller
              name="dataPublication"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">
                        Including the raw data set
                      </SelectItem>
                      <SelectItem value="aggregated">
                        The aggregated results only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
            {errors.dataPublication && (
              <FormMessage>{errors.dataPublication.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Principal investigator (PI)</FormLabel>
            <Controller
              name="principalInvestigator"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
            {errors.principalInvestigator && (
              <FormMessage>
                {errors.principalInvestigator.message}
              </FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Principal investigator e-mail</FormLabel>
            <Controller
              name="principalInvestigatorEmail"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
            {errors.principalInvestigatorEmail && (
              <FormMessage>
                {errors.principalInvestigatorEmail.message}
              </FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Research student name(s)</FormLabel>
            <Controller
              name="researcherNames"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Separate multiple names with comma (,)"
                  />
                </FormControl>
              )}
            />
            {errors.researcherNames && (
              <FormMessage>{errors.researcherNames.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel>Research students e-mail(s)</FormLabel>
            <Controller
              name="researcherEmails"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Separate multiple e-mails with comma (,)"
                  />
                </FormControl>
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Funding project/organization</FormLabel>
            <Controller
              name="funding"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Ethical committee/IRB</FormLabel>
            <Controller
              name="ethicalCommittee"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input {...field} />
                </FormControl>
              )}
            />
          </FormItem>
          <Button type="submit" className="mt-10 w-full">
            Create Consent Form
          </Button>
        </Form>
    </main>
  );
}
