// app/participant/actions.ts
'use server';

import { Prisma, ConsentState } from '@prisma/client';
import prisma from '@/lib/prisma';

interface ConsentFormResponseInput extends Omit<Prisma.ParticipantResponseUncheckedCreateInput, 'signature'> {
  signature?: Uint8Array;
}

export async function createConsentFormResponse(data: ConsentFormResponseInput) {
    // Check if a participant response with the same email and consent form ID already exists
    const existingResponse = await prisma.participantResponse.findFirst({
      where: {
        participantEmail: data.participantEmail,
        consentFormId: data.consentFormId
      }
    });

    if (existingResponse) {
      // update the for with new data
      const updatedResponse = await prisma.participantResponse.update({
        where: {
          id: existingResponse.id,
        },
        data: {
          ...data,
          signature: undefined,
        }
      });
      return existingResponse;
    }

    // Create a new participant response
    const newResponse = await prisma.participantResponse.create({
      data: {
        ...data,
        signature: data.signature ? { create: { content: Buffer.from(data.signature) } } : undefined
      }
    });

    return newResponse;
 
}

export async function updateConsentFormResponse(data: ConsentFormResponseInput) {
    // Update the existing participant response
    const updatedResponse = await prisma.participantResponse.update({
      where: {
        id: data.id,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        consentState: data.consentState,
        signature: data.signature 
          ? { upsert: { create: { content: Buffer.from(data.signature) }, update: { content: Buffer.from(data.signature) } } }
          : undefined
      }
    });

    return updatedResponse;
  
}