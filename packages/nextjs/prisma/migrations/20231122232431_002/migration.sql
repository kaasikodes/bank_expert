/*
  Warnings:

  - You are about to drop the column `name` on the `interactiveaddress` table. All the data in the column will be lost.
  - Added the required column `address` to the `InteractiveAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `interactiveaddress` DROP COLUMN `name`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
