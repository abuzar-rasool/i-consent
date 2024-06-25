// app/participant/actions.ts
'use server';

import { Prisma, ConsentState } from '@prisma/client';
import prisma from '@/lib/prisma';

interface ConsentFormResponseInput extends Omit<Prisma.ParticipantResponseUncheckedCreateInput, 'signature'> {
  signature?: Uint8Array;
}

export async function createConsentFormResponse(data : {responseInput: ConsentFormResponseInput, studyCode: string}) {
    // Check all response for the participant with the given email and consent form's study code
    const existingResponse = await prisma.participantResponse.findFirst({
      where: {
        participantEmail: data.responseInput.participantEmail,
        consentForm: {
          studyCode: data.studyCode
        }
      }
    });

    // 

    if (existingResponse) {
      // update the for with new data
      const updatedResponse = await prisma.participantResponse.update({
        where: {
          id: existingResponse.id,
        },
        data: {
          firstName: data.responseInput.firstName,
          lastName: data.responseInput.lastName,
        }
      });
      return updatedResponse;
    }

    // Create a new participant response
    const newResponse = await prisma.participantResponse.create({
      data: {
        ...data.responseInput,
        signature: data.responseInput.signature ? { create: { content: Buffer.from(data.responseInput.signature) } } : undefined
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
        consentState: data.consentState,
        signature: data.signature 
          ? { upsert: { create: { content: Buffer.from(data.signature) }, update: { content: Buffer.from(data.signature) } } }
          : undefined
      }
    });

    return updatedResponse;
  
}