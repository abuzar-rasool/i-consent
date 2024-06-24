import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import React from 'react';

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

const SignerView = async ({ params }: { params: { id: string } }) => {
  const consentForm = await getConsentForm(params.id);

  return (
    <div>
      <h1>In order to continue signing with the consent form you must provide you email.</h1>
      <p>{consentForm.title}</p>
    </div>
  );
};

export default SignerView;
