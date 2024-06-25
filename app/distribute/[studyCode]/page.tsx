import prisma from '@/lib/prisma';
import React from 'react';
import { notFound } from 'next/navigation';
import { DistributeClientPage } from './client.page';

// Distribute is a component that is used to distribute links to participants
// For the same studyCode and participantId

// If there is only one consent form with the study code then the participant will
// be redirected to the link of that consent form (100% probability)

// If there are two consent form with same study code then the participant will
// be redirecte to either of the two links based (probablity - 50% each)

// If there are more three consent forms with the same study code then the participant
// will be redirected to the link of the consent form based (probablity - 33.33% each)

// The probablity of the redirection is based on the number of consent forms with the same
// study code every time the participant tries to access the link with the same study code

// If user has filled the initial form and the consent status id NOT_GRANTED then the user
// will be redirected to same study as before

const DistributePage = async ({ params }: { params: { studyCode: string } }) => {
  // Fetch the consent forms with the same study code
  const consentForms = await prisma.consentForm.findMany({
    where: {
      studyCode: params.studyCode
    }
  });

  // If there are no consent forms with the same study code then return 404
  if (!consentForms || consentForms.length === 0) {
    notFound();
  }

  // Select the form id to redirect on the basis of the number of consent forms
  const selectedFormID =
    consentForms[Math.floor(Math.random() * consentForms.length)].id;

  return <DistributeClientPage consentFormID={selectedFormID} />;
};

export default DistributePage;
