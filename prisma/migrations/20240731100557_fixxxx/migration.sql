/*
  Warnings:

  - You are about to drop the column `noOfSaves` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `noOfTweets` on the `User` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "noOfSaves";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "noOfTweets";
