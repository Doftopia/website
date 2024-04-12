/*
  Warnings:

  - A unique constraint covering the columns `[userId,portalId]` on the table `Dislike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Dislike_userId_portalId_key` ON `Dislike`(`userId`, `portalId`);
