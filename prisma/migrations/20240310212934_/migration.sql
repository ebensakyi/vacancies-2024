/*
  Warnings:

  - Added the required column `staffId` to the `Confirmation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Confirmation` ADD COLUMN `staffId` VARCHAR(10) NOT NULL,
    ADD COLUMN `workWaec` INTEGER NULL;
