'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function createConsentForm(data: Prisma.ConsentFormCreateInput) {

  console.log(data);
  try {
    const consentForm = await prisma.consentForm.create({
      data: data,
    });
    return consentForm;
  } catch (error) {
    console.error('Failed to create consent form:', error);
  }
}
