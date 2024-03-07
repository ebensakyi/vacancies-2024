/*
  Warnings:

  - A unique constraint covering the columns `[userId,start]` on the table `Employment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Employment_userId_start_key` ON `Employment`(`userId`, `start`);
