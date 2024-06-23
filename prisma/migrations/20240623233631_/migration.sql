/*
  Warnings:

  - The values [NOT_VIEWED,VIEWED] on the enum `ConsentState` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dateOfDataEnd` on the `ConsentForm` table. All the data in the column will be lost.
  - You are about to drop the column `dateRange` on the `ConsentForm` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `ConsentForm` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ConsentForm` table. All the data in the column will be lost.
  - You are about to drop the column `procedureSteps` on the `ConsentForm` table. All the data in the column will be lost.
  - You are about to drop the column `responseData` on the `ParticipantResponse` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `ConsentForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signingMethod` to the `ConsentForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ConsentForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ConsentForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ParticipantResponse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SigningMethod" AS ENUM ('CHECK_BOX', 'SIGNATURE');

-- AlterEnum
BEGIN;
CREATE TYPE "ConsentState_new" AS ENUM ('NOT_GRANTED', 'GRANTED');
ALTER TABLE "ParticipantResponse" ALTER COLUMN "consentState" TYPE "ConsentState_new" USING ("consentState"::text::"ConsentState_new");
ALTER TYPE "ConsentState" RENAME TO "ConsentState_old";
ALTER TYPE "ConsentState_new" RENAME TO "ConsentState";
DROP TYPE "ConsentState_old";
COMMIT;

-- AlterTable
ALTER TABLE "ConsentForm" DROP COLUMN "dateOfDataEnd",
DROP COLUMN "dateRange",
DROP COLUMN "language",
DROP COLUMN "name",
DROP COLUMN "procedureSteps",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "signingMethod" "SigningMethod" NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ParticipantResponse" DROP COLUMN "responseData",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProcedureStep" (
    "id" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "consentFormId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcedureStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "content" BYTEA NOT NULL,
    "participantResponseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_participantResponseId_key" ON "File"("participantResponseId");

-- AddForeignKey
ALTER TABLE "ProcedureStep" ADD CONSTRAINT "ProcedureStep_consentFormId_fkey" FOREIGN KEY ("consentFormId") REFERENCES "ConsentForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_participantResponseId_fkey" FOREIGN KEY ("participantResponseId") REFERENCES "ParticipantResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
