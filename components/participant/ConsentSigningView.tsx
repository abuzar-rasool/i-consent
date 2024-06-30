'use client';

import React, { useEffect, useState } from 'react';
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
  const [showSigningForm, setShowSigningForm] = useState(participantResponse.consentState === ConsentState.NOT_GRANTED);

  useEffect(() => {
    if (participantResponse.consentState === ConsentState.GRANTED) {
      setShowSigningForm(false);
    }
  }, [participantResponse]);

  const mutation = useMutation(updateConsentFormResponse, {
    onSuccess: () => {
      setShowSigningForm(false);
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
      consentState: data.consentGranted ? ConsentState.GRANTED : ConsentState.NOT_GRANTED
    });
  };

  const formURL = consentForm.formLink.replace('${participantID}', participantResponse.id);

  return (
    <div className="signer-view">
      {showSigningForm ? (
        <>
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
        </>
      ) : (
        <iframe 
          src={formURL} 
          title="Consent Form"
          className="w-full h-screen"
          style={{ maxHeight: '100vh' }}
          
        />
      )}
    </div>
  );
};

export default ConsentSigningView;
