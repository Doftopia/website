-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `ankamaUsername` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personnage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `race` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `server` VARCHAR(191) NOT NULL,
    `stuff` VARCHAR(191) NOT NULL,
    `completion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Panoplie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `stuff` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portail` (
    `name` VARCHAR(191) NOT NULL,
    `server` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updaterName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Portail_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Personnage` ADD CONSTRAINT `Personnage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Panoplie` ADD CONSTRAINT `Panoplie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Panoplie` ADD CONSTRAINT `Panoplie_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Personnage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portail` ADD CONSTRAINT `Portail_updaterName_fkey` FOREIGN KEY (`updaterName`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
