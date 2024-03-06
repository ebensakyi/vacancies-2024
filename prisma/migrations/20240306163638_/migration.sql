/*
  Warnings:

  - You are about to alter the column `dob` on the `Personal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Date`.

*/
-- AlterTable
ALTER TABLE `Personal` MODIFY `dob` DATE NULL;
