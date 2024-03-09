/*
  Warnings:

  - A unique constraint covering the columns `[recruitmentId]` on the table `CurrentRecruitment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recruitmentId]` on the table `CurrentShortlisting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CurrentRecruitment_recruitmentId_key` ON `CurrentRecruitment`(`recruitmentId`);

-- CreateIndex
CREATE UNIQUE INDEX `CurrentShortlisting_recruitmentId_key` ON `CurrentShortlisting`(`recruitmentId`);
