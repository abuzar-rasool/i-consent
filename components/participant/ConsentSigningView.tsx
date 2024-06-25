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
import ConsentFormContent from './ConsentFormData';

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
      <ConsentFormContent 
        consentForm={consentForm} 
        participantResponse={participantResponse}
      />
      <div className="max-w-4xl mx-auto p-8">
      {consentForm.signingMethod === SigningMethod.SIGNATURE ? (
        <SignatureForm onSubmit={handleSignatureSubmit} />
      ) : (
        <CheckBoxForm onSubmit={handleCheckBoxSubmit} />
      )}
      </div>
    </div>
  );
};

export default ConsentSigningView;
