import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import React from 'react';

export const metadata = {
  title: 'Consent Form',
  description: 'View consent form details.'
};



const SignerPage = async ({ params }: { params: { responseID: string } }) => {
    const participantResponse = await prisma.participantResponse.findUnique({
        where: { id: params.responseID },
    });

    if (!participantResponse) {
        notFound();
    }

    const  consentForm = await prisma.consentForm.findUnique({
        where: { id: participantResponse.consentFormId },
    });

    if (!consentForm) {
        notFound();
    }




  return (
        // Just show some fields in text for now.
    <div>
        <h1>{consentForm.title}</h1>
        <h2>{consentForm.principalInvestigator}</h2>
        <h3>{consentForm.principalInvestigatorEmail}</h3>
        <h4>{participantResponse.participantEmail}</h4>
        <h5>{participantResponse.firstName ?? ''}</h5>
        <h6>{participantResponse.consentState}</h6>
    </div>


  );
};

export default SignerPage;
