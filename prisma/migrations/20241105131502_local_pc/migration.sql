-- CreateTable
CREATE TABLE "Causa" (
    "id" SERIAL NOT NULL,
    "denominacionCausa" TEXT NOT NULL,
    "ruc" TEXT,
    "fechaDelHecho" TIMESTAMP(3),
    "rit" TEXT,
    "fechaIta" TIMESTAMP(3),
    "numeroIta" TEXT,
    "fechaPpp" TIMESTAMP(3),
    "numeroPpp" TEXT,
    "observacion" TEXT,
    "foliobw" TEXT,
    "causaEcoh" BOOLEAN NOT NULL,
    "causaLegada" BOOLEAN,
    "coordenadasSs" TEXT,
    "homicidioConsumado" BOOLEAN,
    "constituyeSs" BOOLEAN,
    "sinLlamadoEcoh" BOOLEAN,
    "fechaHoraTomaConocimiento" TIMESTAMP(3) NOT NULL,
    "comunaId" INTEGER,
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
CREATE TABLE "Victima" (
    "id" SERIAL NOT NULL,
    "nombreVictima" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "nacionalidadId" INTEGER,

    CONSTRAINT "Victima_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Victima" ADD CONSTRAINT "Victima_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES "Nacionalidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imputado" ADD CONSTRAINT "Imputado_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES "Nacionalidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasImputados" ADD CONSTRAINT "CausasImputados_causaId_fkey" FOREIGN KEY ("causaId") REFERENCES "Causa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasImputados" ADD CONSTRAINT "CausasImputados_imputadoId_fkey" FOREIGN KEY ("imputadoId") REFERENCES "Imputado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasVictimas" ADD CONSTRAINT "CausasVictimas_causaId_fkey" FOREIGN KEY ("causaId") REFERENCES "Causa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CausasVictimas" ADD CONSTRAINT "CausasVictimas_victimaId_fkey" FOREIGN KEY ("victimaId") REFERENCES "Victima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
