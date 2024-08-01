-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "imagesKey" TEXT[],
ADD COLUMN     "imagesUrl" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twitterProfileKey" TEXT,
ADD COLUMN     "twitterProfileUrl" TEXT;
