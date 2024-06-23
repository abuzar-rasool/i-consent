
'use server';

import prisma from '@/lib/prisma';

export async function createConsentForm(data: { name: string }) {

  if (!data.name) {
    throw new Error('Name is required');
  }

  const consentForm = await prisma.consentForm.create({
    data: { name: data.name },
  });

  return consentForm;
}
