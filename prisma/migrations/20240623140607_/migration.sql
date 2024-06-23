-- CreateEnum
CREATE TYPE "ConsentState" AS ENUM ('NOT_VIEWED', 'VIEWED', 'GRANTED');

-- CreateEnum
CREATE TYPE "StudyOptions" AS ENUM ('REPEATED_PARTICIPATION_ALLOWED', 'UNCOMFORTABLE_QUESTIONS');

-- CreateEnum
CREATE TYPE "Compensation" AS ENUM ('NONE', 'EUR1', 'EUR5', 'EUR10', 'EUR15', 'EUR20', 'HALF_CREDIT_POINT', 'ONE_CREDIT_POINT');

-- CreateEnum
CREATE TYPE "CollectedData" AS ENUM ('DEMOGRAPHICS', 'CONTACT_DATA', 'USER_INPUT', 'PHOTOS', 'VIDEOS', 'AUDIO', 'MOTION', 'EYE_MOVEMENT', 'PHYSIOLOGICAL_DATA', 'SCREEN_CAPTURE', 'BODY_METRICS', 'MANUAL_NOTES');

-- CreateEnum
CREATE TYPE "Anonymization" AS ENUM ('NO', 'PSEUDO', 'FULL');

-- CreateEnum
CREATE TYPE "Publication" AS ENUM ('FULL_DATASET', 'AGGREGATED_RESULTS');

-- CreateTable
CREATE TABLE "ConsentForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "researchType" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "dateRange" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "durationUnit" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "studyOptions" "StudyOptions"[],
    "compensation" "Compensation" NOT NULL,
    "procedureSteps" TEXT[],
    "collectedData" "CollectedData"[],
    "dateOfDataEnd" INTEGER NOT NULL,
    "anonymization" "Anonymization" NOT NULL,
    "publication" "Publication" NOT NULL,
    "principalInvestigator" TEXT NOT NULL,
    "principalInvestigatorEmail" TEXT NOT NULL,
    "researcherNames" TEXT,
    "researcherEmails" TEXT,
    "funding" TEXT,
    "ethicalCommittee" TEXT,

    CONSTRAINT "ConsentForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantResponse" (
    "id" TEXT NOT NULL,
    "consentFormId" TEXT NOT NULL,
    "participantEmail" TEXT NOT NULL,
    "responseData" JSONB NOT NULL,
    "consentState" "ConsentState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipantResponse" ADD CONSTRAINT "ParticipantResponse_consentFormId_fkey" FOREIGN KEY ("consentFormId") REFERENCES "ConsentForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
