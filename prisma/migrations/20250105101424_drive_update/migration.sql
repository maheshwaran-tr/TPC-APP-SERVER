/*
  Warnings:

  - You are about to drop the column `mode` on the `Drive` table. All the data in the column will be lost.
  - Added the required column `number_of_rounds` to the `Drive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drive" DROP COLUMN "mode",
ADD COLUMN     "number_of_rounds" INTEGER NOT NULL;
