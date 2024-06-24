'use server';

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export default async function createConsentFormResponse(
  data: Prisma.ParticipantResponseUncheckedCreateInput
)  {
  try{
    // Check if a participant response with the same email and consent form ID already exists
  const existingResponse = await prisma.participantResponse.findFirst({
    where: {
      participantEmail: data.participantEmail,
      consentFormId: data.consentFormId
    }
  });

  if (existingResponse) {
    throw new Error(
      'You have already signed this consent form.'
    );
  }

  // Create a new participant response
  const newResponse = await prisma.participantResponse.create({
    data
  });

  return newResponse;
  } catch (error) {
    throw new Error('Oops! Something went wrong. Please try again.');
  }
  
}
