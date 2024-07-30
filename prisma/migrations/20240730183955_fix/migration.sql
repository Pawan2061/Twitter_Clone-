-- DropIndex
DROP INDEX "Tweet_authorId_key";

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "noOfSaves" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "noOfTweets" INTEGER DEFAULT 0;
