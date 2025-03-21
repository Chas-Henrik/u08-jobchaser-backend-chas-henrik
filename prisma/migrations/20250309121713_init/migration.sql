/*
  Warnings:

  - You are about to drop the column `user_id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `postalcode` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `user_id`;

-- DropIndex
DROP INDEX `user_id` ON `favorites`;

-- AlterTable
ALTER TABLE `favorites` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `dob`,
    DROP COLUMN `postalcode`,
    ADD COLUMN `dateOfBirth` VARCHAR(30) NULL,
    ADD COLUMN `postalCode` VARCHAR(6) NULL,
    MODIFY `firstname` VARCHAR(50) NOT NULL,
    MODIFY `lastname` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `users_favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `favorite_id` VARCHAR(11) NOT NULL,

    INDEX `favorite_id`(`favorite_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `users_favorites` ADD CONSTRAINT `favorite_id` FOREIGN KEY (`favorite_id`) REFERENCES `favorites`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users_favorites` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
