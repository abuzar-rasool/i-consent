/*
  Warnings:

  - The values [UNCOMFORTABLE_QUESTIONS] on the enum `StudyOptions` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ProcedureStep` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StudyOptions_new" AS ENUM ('REPEATED_PARTICIPATION_ALLOWED', 'SURVEY_QUESTIONS');
ALTER TABLE "ConsentForm" ALTER COLUMN "studyOptions" TYPE "StudyOptions_new"[] USING ("studyOptions"::text::"StudyOptions_new"[]);
ALTER TYPE "StudyOptions" RENAME TO "StudyOptions_old";
ALTER TYPE "StudyOptions_new" RENAME TO "StudyOptions";
DROP TYPE "StudyOptions_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ProcedureStep" DROP CONSTRAINT "ProcedureStep_consentFormId_fkey";

-- AlterTable
ALTER TABLE "ConsentForm" ADD COLUMN     "procedureSteps" TEXT[];

-- DropTable
DROP TABLE "ProcedureStep";
