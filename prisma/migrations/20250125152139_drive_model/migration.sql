/*
  Warnings:

  - You are about to drop the column `training_period` on the `Drive` table. All the data in the column will be lost.
  - You are about to drop the column `training_stipend` on the `Drive` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drive" DROP COLUMN "training_period",
DROP COLUMN "training_stipend",
ADD COLUMN     "batch" INTEGER,
ADD COLUMN     "campusMode" TEXT,
ADD COLUMN     "deadLine" TIMESTAMP(3),
ADD COLUMN     "departments" TEXT[],
ADD COLUMN     "jobLink" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "section" TEXT DEFAULT 'A';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deviceToken" TEXT;
