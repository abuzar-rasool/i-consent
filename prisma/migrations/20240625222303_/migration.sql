/*
  Warnings:

  - You are about to drop the column `institution` on the `ConsentForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ConsentForm" DROP COLUMN "institution",
ADD COLUMN     "studyCode" TEXT;
