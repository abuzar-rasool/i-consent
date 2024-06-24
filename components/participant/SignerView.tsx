'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextInput } from '@/components/consent-form/create/TextInput';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import createConsentFormResponse from '@/app/participant/actions';


const formSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

type SignerFormInputs = z.infer<typeof formSchema>;

interface SignerViewProps {
  researchTitle: string;
  supervisorName: string;
  supervisorEmail: string;
  consentFormId: string;
}

const SignerView: React.FC<SignerViewProps> = ({
  researchTitle,
  supervisorName,
  supervisorEmail,
  consentFormId,
}) => {
  const form = useForm<SignerFormInputs>({
    resolver: zodResolver(formSchema)
  });

  const { control, handleSubmit, formState: { errors } } = form;
  const router = useRouter();



  const mutation = useMutation(createConsentFormResponse, {
    onSuccess: (data) => {
      // Redirect to the signing page on success
      router.push(`/${consentFormId}/sign/${data.id}`);
    },
    onError: (error) => {
      console.error('Failed to submit form:', error);
    }
  });

  const onSubmit: SubmitHandler<SignerFormInputs> = async (data) => {
    mutation.mutate({
      consentFormId,
      participantEmail: data.email,
      consentState: 'NOT_GRANTED',
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">What is iConsent?</h1>
      </div>
      <div>
        <p>
          Welcome to the iConsent platform, an open-source solution for managing
          informed consent forms for research studies. You can find the code for
          this platform on GitHub at the following{' '}
          <a
            href="https://github.com/abuzar-rasool/i-consent"
            className="text-blue-500 underline"
          >
            repository
          </a>
          .
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">About the Research</h2>
        <p>
          The researcher for the study titled <strong>{researchTitle}</strong>{' '}
          has chosen to use this platform for managing the consent process. If
          you have any questions, please contact the research supervisor:
        </p>
        <ul>
          <li><strong>Name:</strong> {supervisorName}</li>
          <li><strong>Email:</strong> {supervisorEmail}</li>
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Important Information</h2>
        <p>
          This informed consent is not suitable for vulnerable groups (children,
          disabled, prisoners) or studies where any harm can occur (medical
          studies).
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Platform Background</h2>
        <p>
          The iConsent platform is a continuation of the informed consent
          generator project.<sup><a href="#citation1">1</a></sup>
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Consent Process</h2>
        <p>
          To proceed with the consent process, please provide your email address
          and, optionally, your first and last name. This information will be
          visible to the researchers conducting the study and will be used
          internally by the iConsent platform to track the consent status.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <TextInput control={control} name="email" label="Email (Required)" />
          {errors.email && (
            <FormMessage>{errors.email.message}</FormMessage>
          )}
          <TextInput control={control} name="firstName" label="First Name (Optional)" />
          <TextInput control={control} name="lastName" label="Last Name (Optional)" />
          {mutation.isError && (
            <FormMessage>{(mutation.error as Error).message}</FormMessage>
          )}
          
          <Button type="submit" className="mt-10 w-full" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Submitting...' : 'Continue To Consent Form Signing'}
          </Button>
        </form>
      </Form>

      <footer className="mt-8 text-sm">
        <p id="citation1">
          1. Schwind, Valentin, Resch, Stefan, and Sehrt, Jessica. 2023. "The
          HCI User Studies Toolkit: Supporting Study Designing and Planning for
          Undergraduates and Novice Researchers in Human-Computer Interaction."
          In{' '}
          <em>
            Extended Abstracts of the 2020 CHI Conference on Human Factors in
            Computing Systems
          </em>
          . Association for Computing Machinery, New York, NY, USA. DOI:{' '}
          <a
            href="https://doi.org/10.1145/3544549.3585890"
            className="text-blue-500 underline"
          >
            10.1145/3544549.3585890
          </a>
          .
        </p>
      </footer>
    </main>
  );
};

export default SignerView;
