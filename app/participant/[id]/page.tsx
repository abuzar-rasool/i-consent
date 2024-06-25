import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import React from 'react';
import ParticipantView from '@/components/participant/ParticipantView';



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
    <ParticipantView 
      researchTitle={consentForm.title} 
      supervisorName={consentForm.principalInvestigator} 
      supervisorEmail={consentForm.principalInvestigatorEmail} 
      consentFormId={consentForm.id}
      consentFormStudyCode={consentForm.studyCode ?? ''}
    />
  );
};

export default ParticipantPage;
