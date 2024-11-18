/*
  Warnings:

  - You are about to drop the column `principalImputado` on the `CausasImputados` table. All the data in the column will be lost.

*/
-- AlterTable

ADD COLUMN     "esimputado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "essujetoInteres" BOOLEAN NOT NULL DEFAULT false;


-- Step 2: Establecer valores por defecto basados en principalImputado
UPDATE "CausasImputados"
SET "imputado" = "principalImputado",
    "sujetoInteres" = false;

-- Step 3: Establecer las columnas como NOT NULL con valor por defecto
ALTER TABLE "CausasImputados" 
ALTER COLUMN "esimputado" SET NOT NULL,
ALTER COLUMN "esimputado" SET DEFAULT false,
ALTER COLUMN "essujetoInteres" SET NOT NULL,
ALTER COLUMN "essujetoInteres" SET DEFAULT false;

-- Step 4: Eliminar la columna antigua
ALTER TABLE "CausasImputados" 
DROP COLUMN "principalImputado";