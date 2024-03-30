/*
  Warnings:

  - You are about to drop the column `Link` on the `Personnage` table. All the data in the column will be lost.
  - Added the required column `link` to the `Personnage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Personnage` DROP COLUMN `Link`,
    ADD COLUMN `link` VARCHAR(191) NOT NULL;
