/*
  Warnings:

  - You are about to drop the column `dislike` on the `Portail` table. All the data in the column will be lost.
  - Added the required column `id` to the `Portail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Portail` DROP COLUMN `dislike`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Dislike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `portalId` INTEGER NOT NULL,
    `wrongPos` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dislike` ADD CONSTRAINT `Dislike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dislike` ADD CONSTRAINT `Dislike_portalId_fkey` FOREIGN KEY (`portalId`) REFERENCES `Portail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
