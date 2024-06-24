import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import React from 'react';
import { Prisma } from '@prisma/client';
import { Sign } from 'crypto';
import SignerView from '@/components/participant/SignerView';

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
    <SignerView
        consentForm={consentForm}
        participantResponse={participantResponse}
    />


  );
};

export default SignerPage;



