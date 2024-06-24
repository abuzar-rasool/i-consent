'use client';

import React from 'react';
import {
  ConsentForm,
  ParticipantResponse,
} from '@prisma/client';
import ConsentSigningView from './ConsentSigningView';

interface SignerViewProps {
  consentForm: ConsentForm;
  participantResponse: ParticipantResponse;
}

const SignerView: React.FC<SignerViewProps> = ({
  consentForm,
  participantResponse
}) => {

  return (
    <div className="signer-view">
      <ConsentSigningView consentForm={consentForm} participantResponse={participantResponse} />
    </div>
  );
};

export default SignerView;
