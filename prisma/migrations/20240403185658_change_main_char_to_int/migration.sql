/*
  Warnings:

  - Made the column `mainChar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `mainChar` INTEGER NOT NULL;
