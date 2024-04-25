/*
  Warnings:

  - You are about to drop the column `mainChar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Personnage` ADD COLUMN `mainChar` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `mainChar`;
