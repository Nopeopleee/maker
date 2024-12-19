/*
  Warnings:

  - You are about to drop the column `content` on the `home_details` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `home_details` table. All the data in the column will be lost.
  - You are about to drop the column `image_alt` on the `home_details` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `home_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `home_details` DROP COLUMN `content`,
    DROP COLUMN `image`,
    DROP COLUMN `image_alt`,
    DROP COLUMN `link`,
    ADD COLUMN `content_1` TEXT NULL,
    ADD COLUMN `content_2` TEXT NULL,
    ADD COLUMN `content_3` TEXT NULL,
    ADD COLUMN `content_4` TEXT NULL,
    ADD COLUMN `content_5` TEXT NULL,
    ADD COLUMN `image_1` VARCHAR(191) NULL,
    ADD COLUMN `image_2` VARCHAR(191) NULL,
    ADD COLUMN `image_3` VARCHAR(191) NULL,
    ADD COLUMN `image_4` VARCHAR(191) NULL,
    ADD COLUMN `image_5` VARCHAR(191) NULL,
    ADD COLUMN `link_1` VARCHAR(191) NULL,
    ADD COLUMN `link_2` VARCHAR(191) NULL,
    ADD COLUMN `link_3` VARCHAR(191) NULL,
    ADD COLUMN `link_4` VARCHAR(191) NULL,
    ADD COLUMN `link_5` VARCHAR(191) NULL,
    ADD COLUMN `subtitle` VARCHAR(191) NULL;
