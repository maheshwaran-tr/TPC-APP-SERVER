/*
  Warnings:

  - You are about to drop the column `drive_time` on the `Drive` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drive" DROP COLUMN "drive_time",
ALTER COLUMN "drive_date" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "batch" INTEGER,
ALTER COLUMN "profile_url" SET DEFAULT 'https://pbywhmrgjtkosnsdunvc.supabase.co/storage/v1/object/public/sit-tpc/profile/default.png?';

-- CreateTable
CREATE TABLE "Training" (
    "training_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "training_dates" TIMESTAMP(3)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("training_id")
);

-- CreateTable
CREATE TABLE "training_attendance" (
    "attendance_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "training_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- AddForeignKey
ALTER TABLE "training_attendance" ADD CONSTRAINT "training_attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_attendance" ADD CONSTRAINT "training_attendance_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("training_id") ON DELETE RESTRICT ON UPDATE CASCADE;
