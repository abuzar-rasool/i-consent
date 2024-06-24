import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import React from 'react';
import SignerView from '@/components/participant/SignerView';



export const metadata = {
  title: 'Consent Form',
  description: 'View consent form details.'
};

async function getConsentForm(id: string) {
  const consentForm = await prisma.consentForm.findUnique({
    where: { id },
  });

  if (!consentForm) {
    notFound();
  }

  return consentForm;
}

const ParticipantPage = async ({ params }: { params: { id: string } }) => {
  const consentForm = await getConsentForm(params.id);

  return (
    <SignerView 
      researchTitle={consentForm.title} 
      supervisorName={consentForm.principalInvestigator} 
      supervisorEmail={consentForm.principalInvestigatorEmail} 
      consentFormId={consentForm.id}
    />
  );
};

export default ParticipantPage;
