/*
  Warnings:

  - Added the required column `updatedAt` to the `Imputado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CausasImputados" ADD COLUMN     "cautelarId" INTEGER,
ADD COLUMN     "fechaFormalizacion" TIMESTAMP(3),
ADD COLUMN     "formalizado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "principalImputado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Imputado" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Cautelar" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Cautelar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CausasImputados" ADD CONSTRAINT "CausasImputados_cautelarId_fkey" FOREIGN KEY ("cautelarId") REFERENCES "Cautelar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
