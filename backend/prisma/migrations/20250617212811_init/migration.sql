/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Board` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `boardId` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_boardId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "boardId",
ADD COLUMN     "boardId" INTEGER NOT NULL,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
