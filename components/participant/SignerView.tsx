'use client';

import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from 'react-query';
import {
  ConsentForm,
  ParticipantResponse,
  SigningMethod,
  ConsentState
} from '@prisma/client';
import { TextInput } from '@/components/consent-form/create/TextInput';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import {
  createConsentFormResponse,
  updateConsentFormResponse
} from '@/app/participant/actions';
import SignatureCanvas from 'react-signature-canvas';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  consentGranted: z.boolean().refine((value) => value === true, {
    message: 'You must agree to participate in the study'
  })
});

type SignerViewInputs = z.infer<typeof formSchema>;

interface SignerViewProps {
  consentForm: ConsentForm;
  participantResponse: ParticipantResponse;
}

const SignerView: React.FC<SignerViewProps> = ({
  consentForm,
  participantResponse
}) => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [signatureError, setSignatureError] = useState<string | null>(null);

  const form = useForm<SignerViewInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consentGranted: participantResponse.consentState === ConsentState.GRANTED
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form;

  const navigateUser = () => {
    // Extract the form URL from the consentForm object
    const formURL = consentForm.formLink;

    console.log('formURL', formURL);

    // Extract the participant ID from the participantResponse object
    const participantID = participantResponse.id;

    // Replace the placeholder ${participantID} in the form URL with the actual participant ID
    const updatedFormURL = formURL.replace('${participantID}', participantID);

    // Navigate the user to the updated form URL
    window.location.href = updatedFormURL;
  };

  if (participantResponse.consentState === ConsentState.GRANTED) {
    // navigate the user to the form URL
    navigateUser();
  }

  const mutation = useMutation(updateConsentFormResponse, {
    onSuccess: () => {
        navigateUser();
    },
    onError: (error) => {
      console.error('Failed to submit form:', error);
    }
  });

  const onSubmit: SubmitHandler<SignerViewInputs> = async (data) => {
    if (
      consentForm.signingMethod === SigningMethod.SIGNATURE &&
      signatureRef.current?.isEmpty()
    ) {
      setSignatureError('Signature is required');
      return;
    }

    let signatureBytes: Uint8Array | undefined;
    if (
      consentForm.signingMethod === SigningMethod.SIGNATURE &&
      signatureRef.current
    ) {
      const signatureDataURL = signatureRef.current.toDataURL('image/png');
      const base64Data = signatureDataURL.split(',')[1];
      signatureBytes = Uint8Array.from(atob(base64Data), (c) =>
        c.charCodeAt(0)
      );
    }

    mutation.mutate({
      ...participantResponse,
      consentState: data.consentGranted
        ? ConsentState.GRANTED
        : ConsentState.NOT_GRANTED,
      signature: signatureBytes
    });
  };

  //   if (showThankYou) {
  //     return <ThankYou alreadyConsented={participantResponse.consentState === ConsentState.GRANTED} />;
  //   }

  //   if (participantResponse.consentState === ConsentState.GRANTED) {
  //     return <ThankYou alreadyConsented={true} />;
  //   }

  return (
    <div className="signer-view">
      <h1>Informed Consent of Study Participation</h1>
      <h2>{consentForm.title}</h2>

      {/* ... (keep the rest of the informational content as before) ... */}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h3>7. Informed Consent and Agreement</h3>
          <p>
            I understand the explanation of the user study provided to me and I
            voluntarily agree to participate in this user study. I have had all
            my questions answered to my satisfaction and I am aware of risks and
            benefits. I understand that this declaration of consent is revocable
            at any time. I can obtain a copy of this consent form upon request.
          </p>

          {consentForm.signingMethod === SigningMethod.SIGNATURE && (
            <div>
              <label>Signature:</label>
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas'
                }}
              />
              <Button
                type="button"
                onClick={() => signatureRef.current?.clear()}
              >
                Clear Signature
              </Button>
              {signatureError && <FormMessage>{signatureError}</FormMessage>}
            </div>
          )}

          <div>
            <label>
              <input type="checkbox" {...form.register('consentGranted')} />I
              have read and understood the information provided and agree to
              participate in this study.
            </label>
            {errors.consentGranted && (
              <FormMessage>{errors.consentGranted.message}</FormMessage>
            )}
          </div>

          {mutation.isError && (
            <FormMessage>{(mutation.error as Error).message}</FormMessage>
          )}

          <Button
            type="submit"
            className="mt-10 w-full"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Submitting...' : 'Submit Consent'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignerView;
