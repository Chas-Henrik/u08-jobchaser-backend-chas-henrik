-- CreateTable
CREATE TABLE `favorites` (
    `id` VARCHAR(11) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `employer` VARCHAR(100) NOT NULL,
    `logo_url` VARCHAR(255) NULL,
    `headline` VARCHAR(255) NULL,
    `position` VARCHAR(255) NULL,
    `role` VARCHAR(255) NULL,
    `posted` DATETIME(0) NULL,
    `expires` DATETIME(0) NULL,
    `contract` VARCHAR(50) NOT NULL,
    `city` VARCHAR(30) NULL,
    `region` VARCHAR(40) NULL,
    `country` VARCHAR(50) NULL,
    `url` VARCHAR(255) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(30) NOT NULL,
    `lastname` VARCHAR(30) NOT NULL,
    `address` VARCHAR(50) NULL,
    `postalcode` VARCHAR(6) NULL,
    `city` VARCHAR(50) NULL,
    `country` VARCHAR(50) NULL,
    `phone` VARCHAR(15) NOT NULL,
    `dob` DATE NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
