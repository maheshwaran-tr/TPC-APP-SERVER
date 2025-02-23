/*
  Warnings:

  - Added the required column `status` to the `training_attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "training_attendance" ADD COLUMN     "status" TEXT NOT NULL;
