/*
  Warnings:

  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- DropIndex
DROP INDEX "public"."user_phone_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(10);
