-- AlterTable
ALTER TABLE `homepages` ADD COLUMN `menu_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `homepages` ADD CONSTRAINT `homepages_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
