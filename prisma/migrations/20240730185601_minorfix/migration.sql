/*
  Warnings:

  - You are about to drop the column `noOfSaves` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `noOfTweets` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "noOfSaves";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "noOfTweets";
