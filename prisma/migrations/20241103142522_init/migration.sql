/*
  Warnings:

  - You are about to drop the column `comuna` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `diasterminoplazo` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `fechaVencimientoInvestigacion` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `rut` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `terminoDePlazoProcesalPenal` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacionSsCoordenadas` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacionSsNombre` on the `Causa` table. All the data in the column will be lost.
  - You are about to drop the column `victima` on the `Causa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Causa" DROP COLUMN "comuna",
DROP COLUMN "diasterminoplazo",
DROP COLUMN "fechaVencimientoInvestigacion",
DROP COLUMN "rut",
DROP COLUMN "terminoDePlazoProcesalPenal",
DROP COLUMN "ubicacionSsCoordenadas",
DROP COLUMN "ubicacionSsNombre",
DROP COLUMN "victima",
ADD COLUMN     "comunaId" INTEGER,
ADD COLUMN     "coordenadasSs" TEXT,
ALTER COLUMN "ruc" DROP NOT NULL,
ALTER COLUMN "rit" DROP NOT NULL,
ALTER COLUMN "fechaIta" DROP NOT NULL,
ALTER COLUMN "numeroIta" DROP NOT NULL,
ALTER COLUMN "fechaPpp" DROP NOT NULL,
ALTER COLUMN "numeroPpp" DROP NOT NULL,
ALTER COLUMN "observacion" DROP NOT NULL,
ALTER COLUMN "foliobw" DROP NOT NULL,
ALTER COLUMN "causaLegada" DROP NOT NULL,
ALTER COLUMN "homicidioConsumado" DROP NOT NULL,
ALTER COLUMN "constituyeSs" DROP NOT NULL,
ALTER COLUMN "sinLlamadoEcoh" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Victima" (
    "id" SERIAL NOT NULL,
    "nombreVictima" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "nacionalidadId" INTEGER,

    CONSTRAINT "Victima_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CausasVictimas" (
    "causaId" INTEGER NOT NULL,
    "victimaId" INTEGER NOT NULL,

    CONSTRAINT "CausasVictimas_pkey" PRIMARY KEY ("causaId","victimaId")
);

-- CreateTable
CREATE TABLE "Comuna" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Comuna_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_comunaId_fkey" FOREIGN KEY ("comunaId") REFERENCES "Comuna"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Victima" ADD CONSTRAINT "Victima_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES "Nacionalidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasVictimas" ADD CONSTRAINT "CausasVictimas_causaId_fkey" FOREIGN KEY ("causaId") REFERENCES "Causa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasVictimas" ADD CONSTRAINT "CausasVictimas_victimaId_fkey" FOREIGN KEY ("victimaId") REFERENCES "Victima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
