-- CreateTable
CREATE TABLE "Causa" (
    "id" SERIAL NOT NULL,
    "denominacionCausa" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "fechaDelHecho" TIMESTAMP(3) NOT NULL,
    "rit" TEXT NOT NULL,
    "fechaIta" TIMESTAMP(3) NOT NULL,
    "numeroIta" TEXT NOT NULL,
    "fechaPpp" TIMESTAMP(3) NOT NULL,
    "numeroPpp" TEXT NOT NULL,
    "terminoDePlazoProcesalPenal" TEXT NOT NULL,
    "victima" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "observacion" TEXT NOT NULL,
    "foliobw" TEXT NOT NULL,
    "fechaVencimientoInvestigacion" TIMESTAMP(3) NOT NULL,
    "diasterminoplazo" TEXT NOT NULL,
    "causaEcoh" BOOLEAN NOT NULL,
    "causaLegada" BOOLEAN NOT NULL,
    "comuna" TEXT NOT NULL,
    "ubicacionSsCoordenadas" TEXT NOT NULL,
    "ubicacionSsNombre" TEXT NOT NULL,
    "homicidioConsumado" BOOLEAN NOT NULL,
    "constituyeSs" BOOLEAN NOT NULL,
    "sinLlamadoEcoh" BOOLEAN NOT NULL,
    "fechaHoraTomaConocimiento" TIMESTAMP(3) NOT NULL,
    "analistaId" INTEGER,
    "fiscalId" INTEGER,
    "focoId" INTEGER,
    "delitoId" INTEGER,
    "abogadoId" INTEGER,
    "tribunalId" INTEGER,
    "nacionalidadVictimaId" INTEGER,

    CONSTRAINT "Causa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imputado" (
    "id" SERIAL NOT NULL,
    "nombreSujeto" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "nacionalidadId" INTEGER,

    CONSTRAINT "Imputado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nacionalidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Nacionalidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Analista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiscal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Fiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foco" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Foco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delito" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Delito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abogado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Abogado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tribunal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Tribunal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CausasImputados" (
    "causaId" INTEGER NOT NULL,
    "imputadoId" INTEGER NOT NULL,

    CONSTRAINT "CausasImputados_pkey" PRIMARY KEY ("causaId","imputadoId")
);

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_analistaId_fkey" FOREIGN KEY ("analistaId") REFERENCES "Analista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_fiscalId_fkey" FOREIGN KEY ("fiscalId") REFERENCES "Fiscal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_focoId_fkey" FOREIGN KEY ("focoId") REFERENCES "Foco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_delitoId_fkey" FOREIGN KEY ("delitoId") REFERENCES "Delito"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_abogadoId_fkey" FOREIGN KEY ("abogadoId") REFERENCES "Abogado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_tribunalId_fkey" FOREIGN KEY ("tribunalId") REFERENCES "Tribunal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_nacionalidadVictimaId_fkey" FOREIGN KEY ("nacionalidadVictimaId") REFERENCES "Nacionalidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imputado" ADD CONSTRAINT "Imputado_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES "Nacionalidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasImputados" ADD CONSTRAINT "CausasImputados_causaId_fkey" FOREIGN KEY ("causaId") REFERENCES "Causa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasImputados" ADD CONSTRAINT "CausasImputados_imputadoId_fkey" FOREIGN KEY ("imputadoId") REFERENCES "Imputado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
