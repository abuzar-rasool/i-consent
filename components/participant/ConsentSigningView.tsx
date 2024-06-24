'use client';

import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import {
  ConsentForm,
  ParticipantResponse,
  SigningMethod,
  ConsentState
} from '@prisma/client';
import CheckBoxForm from './CheckBoxForm';
import { updateConsentFormResponse } from '@/app/participant/actions';
import SignatureForm from './SignatureForm';

interface ConsentSigningViewProps {
  consentForm: ConsentForm;
  participantResponse: ParticipantResponse;
}

const ConsentSigningView: React.FC<ConsentSigningViewProps> = ({
  consentForm,
  participantResponse
}) => {
  const navigateUser = () => {
    const formURL = consentForm.formLink;
    const participantID = participantResponse.id;
    const updatedFormURL = formURL.replace('${participantID}', participantID);
    window.location.href = updatedFormURL;
  };

  useEffect(() => {
    if (participantResponse.consentState === ConsentState.GRANTED) {
      navigateUser();
    }
  }, [participantResponse]);

  const mutation = useMutation(updateConsentFormResponse, {
    onSuccess: () => {
      navigateUser();
    },
    onError: (error) => {
      console.error('Failed to submit form:', error);
    }
  });

  const handleSignatureSubmit = (signatureBytes: Uint8Array) => {
    mutation.mutate({
      ...participantResponse,
      consentState: ConsentState.GRANTED,
      signature: signatureBytes
    });
  };

  const handleCheckBoxSubmit = (data: { consentGranted: boolean }) => {
    mutation.mutate({
      ...participantResponse,
      consentState: ConsentState.GRANTED
    });
  };

  return (
    <div className="signer-view">
      <h1>Informed Consent of Study Participation</h1>
      <h2>{consentForm.title}</h2>
      <h3>7. Informed Consent and Agreement</h3>
      <p>
        I understand the explanation of the user study provided to me and I
        voluntarily agree to participate in this user study. I have had all my
        questions answered to my satisfaction and I am aware of risks and
        benefits. I understand that this declaration of consent is revocable at
        any time. I can obtain a copy of this consent form upon request.
      </p>

      {consentForm.signingMethod === SigningMethod.SIGNATURE ? (
        <SignatureForm onSubmit={handleSignatureSubmit} />
      ) : (
        <CheckBoxForm onSubmit={handleCheckBoxSubmit} />
      )}
    </div>
  );
};

export default ConsentSigningView;
