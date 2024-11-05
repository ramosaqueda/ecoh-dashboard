--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:W5jYfzBNo3WFf38gqLO2vQ==$gA9y9WmxMNjbIayUOtpyNvfsB+m2mZXe/p5n6NdQEUE=:GnZtxnjMhPFWXycqAvrB9hZSN3JYFuGXKRH1kMnKKU0=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "ecoh" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ecoh; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecoh WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE ecoh OWNER TO postgres;

\connect ecoh

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Abogado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Abogado" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Abogado" OWNER TO postgres;

--
-- Name: Abogado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Abogado_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Abogado_id_seq" OWNER TO postgres;

--
-- Name: Abogado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Abogado_id_seq" OWNED BY public."Abogado".id;


--
-- Name: Analista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Analista" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Analista" OWNER TO postgres;

--
-- Name: Analista_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Analista_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Analista_id_seq" OWNER TO postgres;

--
-- Name: Analista_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Analista_id_seq" OWNED BY public."Analista".id;


--
-- Name: Causa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Causa" (
    id integer NOT NULL,
    "denominacionCausa" text NOT NULL,
    ruc text,
    "fechaDelHecho" date NOT NULL,
    rit text,
    "fechaIta" date,
    "numeroIta" text,
    "fechaPpp" date,
    "numeroPpp" text,
    observacion text,
    foliobw text,
    "causaEcoh" boolean NOT NULL,
    "causaLegada" boolean,
    "homicidioConsumado" boolean,
    "constituyeSs" boolean,
    "sinLlamadoEcoh" boolean,
    "fechaHoraTomaConocimiento" timestamp(3) without time zone NOT NULL,
    "analistaId" integer,
    "fiscalId" integer,
    "focoId" integer,
    "delitoId" integer,
    "abogadoId" integer,
    "tribunalId" integer,
    "nacionalidadVictimaId" integer,
    "comunaId" integer,
    "coordenadasSs" text
);


ALTER TABLE public."Causa" OWNER TO postgres;

--
-- Name: Causa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Causa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Causa_id_seq" OWNER TO postgres;

--
-- Name: Causa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Causa_id_seq" OWNED BY public."Causa".id;


--
-- Name: CausasImputados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CausasImputados" (
    "causaId" integer NOT NULL,
    "imputadoId" integer NOT NULL
);


ALTER TABLE public."CausasImputados" OWNER TO postgres;

--
-- Name: CausasVictimas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CausasVictimas" (
    "causaId" integer NOT NULL,
    "victimaId" integer NOT NULL
);


ALTER TABLE public."CausasVictimas" OWNER TO postgres;

--
-- Name: Comuna; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comuna" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Comuna" OWNER TO postgres;

--
-- Name: Comuna_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comuna_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comuna_id_seq" OWNER TO postgres;

--
-- Name: Comuna_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comuna_id_seq" OWNED BY public."Comuna".id;


--
-- Name: Delito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Delito" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Delito" OWNER TO postgres;

--
-- Name: Delito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Delito_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Delito_id_seq" OWNER TO postgres;

--
-- Name: Delito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Delito_id_seq" OWNED BY public."Delito".id;


--
-- Name: Fiscal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Fiscal" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Fiscal" OWNER TO postgres;

--
-- Name: Fiscal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Fiscal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Fiscal_id_seq" OWNER TO postgres;

--
-- Name: Fiscal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Fiscal_id_seq" OWNED BY public."Fiscal".id;


--
-- Name: Foco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Foco" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Foco" OWNER TO postgres;

--
-- Name: Foco_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Foco_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Foco_id_seq" OWNER TO postgres;

--
-- Name: Foco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Foco_id_seq" OWNED BY public."Foco".id;


--
-- Name: Imputado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Imputado" (
    id integer NOT NULL,
    "nombreSujeto" text NOT NULL,
    "docId" text NOT NULL,
    "nacionalidadId" integer
);


ALTER TABLE public."Imputado" OWNER TO postgres;

--
-- Name: Imputado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Imputado_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Imputado_id_seq" OWNER TO postgres;

--
-- Name: Imputado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Imputado_id_seq" OWNED BY public."Imputado".id;


--
-- Name: Nacionalidad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Nacionalidad" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Nacionalidad" OWNER TO postgres;

--
-- Name: Nacionalidad_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Nacionalidad_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Nacionalidad_id_seq" OWNER TO postgres;

--
-- Name: Nacionalidad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Nacionalidad_id_seq" OWNED BY public."Nacionalidad".id;


--
-- Name: Tribunal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tribunal" (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public."Tribunal" OWNER TO postgres;

--
-- Name: Tribunal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tribunal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tribunal_id_seq" OWNER TO postgres;

--
-- Name: Tribunal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tribunal_id_seq" OWNED BY public."Tribunal".id;


--
-- Name: Victima; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Victima" (
    id integer NOT NULL,
    "nombreVictima" text NOT NULL,
    "docId" text NOT NULL,
    "nacionalidadId" integer
);


ALTER TABLE public."Victima" OWNER TO postgres;

--
-- Name: Victima_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Victima_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Victima_id_seq" OWNER TO postgres;

--
-- Name: Victima_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Victima_id_seq" OWNED BY public."Victima".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Abogado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Abogado" ALTER COLUMN id SET DEFAULT nextval('public."Abogado_id_seq"'::regclass);


--
-- Name: Analista id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Analista" ALTER COLUMN id SET DEFAULT nextval('public."Analista_id_seq"'::regclass);


--
-- Name: Causa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa" ALTER COLUMN id SET DEFAULT nextval('public."Causa_id_seq"'::regclass);


--
-- Name: Comuna id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comuna" ALTER COLUMN id SET DEFAULT nextval('public."Comuna_id_seq"'::regclass);


--
-- Name: Delito id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Delito" ALTER COLUMN id SET DEFAULT nextval('public."Delito_id_seq"'::regclass);


--
-- Name: Fiscal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fiscal" ALTER COLUMN id SET DEFAULT nextval('public."Fiscal_id_seq"'::regclass);


--
-- Name: Foco id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Foco" ALTER COLUMN id SET DEFAULT nextval('public."Foco_id_seq"'::regclass);


--
-- Name: Imputado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Imputado" ALTER COLUMN id SET DEFAULT nextval('public."Imputado_id_seq"'::regclass);


--
-- Name: Nacionalidad id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Nacionalidad" ALTER COLUMN id SET DEFAULT nextval('public."Nacionalidad_id_seq"'::regclass);


--
-- Name: Tribunal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tribunal" ALTER COLUMN id SET DEFAULT nextval('public."Tribunal_id_seq"'::regclass);


--
-- Name: Victima id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Victima" ALTER COLUMN id SET DEFAULT nextval('public."Victima_id_seq"'::regclass);


--
-- Data for Name: Abogado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Abogado" (id, nombre) FROM stdin;
1	Marco Cáceres
2	Juan Pablo Gonzáles
3	Maria Veronica Castro
4	Patricio López
5	Equipo Jurídico
6	No Aplica
7	No Definido
\.


--
-- Data for Name: Analista; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Analista" (id, nombre) FROM stdin;
1	Rafael Ramos
2	Harry Díaz
3	Hector Astudillo
4	Barbara León
5	Equipo Analistas
6	No Aplica
7	No definido
\.


--
-- Data for Name: Causa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Causa" (id, "denominacionCausa", ruc, "fechaDelHecho", rit, "fechaIta", "numeroIta", "fechaPpp", "numeroPpp", observacion, foliobw, "causaEcoh", "causaLegada", "homicidioConsumado", "constituyeSs", "sinLlamadoEcoh", "fechaHoraTomaConocimiento", "analistaId", "fiscalId", "focoId", "delitoId", "abogadoId", "tribunalId", "nacionalidadVictimaId", "comunaId", "coordenadasSs") FROM stdin;
1	pepe	1231	2024-11-04	12321	2024-11-04	1221	2024-11-04	12321	adosadas	12321	t	f	\N	t	\N	2024-11-04 03:06:00	\N	\N	3	\N	\N	3	\N	\N	12321321
2	peeeco	\N	2024-11-04	\N	\N	\N	\N	\N	\N	\N	f	f	\N	f	\N	2024-11-04 03:06:00	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	las papas	\N	2024-11-04	\N	2024-11-04	121	2024-11-04	1212	Pepe rijas	\N	t	f	\N	t	\N	2024-11-04 03:13:00	\N	\N	3	\N	\N	3	\N	\N	12321
4	la Gea loca	1234	2024-11-04	12312	2024-11-04	12321	2024-11-04	12132	la wea bakan	1213	t	f	\N	f	\N	2024-11-04 03:26:00	\N	\N	5	\N	\N	3	\N	\N	12312312
\.


--
-- Data for Name: CausasImputados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CausasImputados" ("causaId", "imputadoId") FROM stdin;
\.


--
-- Data for Name: CausasVictimas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CausasVictimas" ("causaId", "victimaId") FROM stdin;
\.


--
-- Data for Name: Comuna; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comuna" (id, nombre) FROM stdin;
1	Andacollo
2	 Canela
3	 Combarbalá
4	 Coquimbo
5	 Illapel
6	 La Higuera
7	 La Serena
8	 Los Vilos
9	 Monte Patria
10	 Ovalle
11	 Paihuano
12	 Punitaqui
13	 Río Hurtado
14	 Salamanca
15	 Vicuña
\.


--
-- Data for Name: Delito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Delito" (id, nombre) FROM stdin;
1	Homicidio
2	Secuestro
3	Lesiones Graves
4	No definido
\.


--
-- Data for Name: Fiscal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Fiscal" (id, nombre) FROM stdin;
1	Eduardo Yáñez
2	Nicolás Nicoreanu
3	Freddy Salinas
4	Carlos Vidal
5	Ricardo Soto
\.


--
-- Data for Name: Foco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Foco" (id, nombre) FROM stdin;
1	ECOH Elqui
2	ECOH Limarí-Choapa
3	Calles Peligrosas
4	Pantan
5	Diamante Verde
\.


--
-- Data for Name: Imputado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Imputado" (id, "nombreSujeto", "docId", "nacionalidadId") FROM stdin;
\.


--
-- Data for Name: Nacionalidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Nacionalidad" (id, nombre) FROM stdin;
1	Antigua y Barbuda
2	Argentina
3	Aruba
4	Bahamas
5	Barbados
6	Belice
7	Bolivia
8	Brasil
9	Chile
10	Colombia
11	Costa Rica
12	Cuba
13	Dominica
14	Ecuador
15	El Salvador
16	Grenada
17	Guadalupe
18	Guatemala
19	Guyana
20	Guyana Francesa
21	Haití
22	Honduras
23	Islas Caimán
24	Islas Turcas y Caicos
25	Islas Vírgenes
26	Jamaica
27	Martinica
28	México
29	Nicaragua
30	Panamá
31	Paraguay
32	Perú
33	Puerto Rico
34	República Dominicana
35	San Bartolomé
36	San Crist
\.


--
-- Data for Name: Tribunal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tribunal" (id, nombre) FROM stdin;
1	\tJG La Serena
2	\tJG Vicuña\t 
3	\tJG Coquimbo\t 
4	\tJG Ovalle\t 
5	\tJG Illapel
6	\tJG Los Vilos
\.


--
-- Data for Name: Victima; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Victima" (id, "nombreVictima", "docId", "nacionalidadId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d52b3980-2868-492b-b1de-8800244fa843	376fba62fac6d90e3d2ee08e3f433abbbc68105063114bd8b2802a6fee941be0	2024-11-03 14:25:21.507796+00	20240815201150_init	\N	\N	2024-11-03 14:25:21.483001+00	1
e59089ba-b54c-494e-a3cd-3321f1f25c46	214d61b82742ca888dd47a5734b86fa521c8c3c15f6ccfde5a7e460899566a33	2024-11-03 14:25:22.14776+00	20241103142522_init	\N	\N	2024-11-03 14:25:22.126915+00	1
\.


--
-- Name: Abogado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Abogado_id_seq"', 1, false);


--
-- Name: Analista_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Analista_id_seq"', 1, false);


--
-- Name: Causa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Causa_id_seq"', 4, true);


--
-- Name: Comuna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comuna_id_seq"', 1, false);


--
-- Name: Delito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Delito_id_seq"', 1, false);


--
-- Name: Fiscal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Fiscal_id_seq"', 1, false);


--
-- Name: Foco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Foco_id_seq"', 1, false);


--
-- Name: Imputado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Imputado_id_seq"', 1, false);


--
-- Name: Nacionalidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Nacionalidad_id_seq"', 1, false);


--
-- Name: Tribunal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tribunal_id_seq"', 1, false);


--
-- Name: Victima_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Victima_id_seq"', 1, false);


--
-- Name: Abogado Abogado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Abogado"
    ADD CONSTRAINT "Abogado_pkey" PRIMARY KEY (id);


--
-- Name: Analista Analista_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Analista"
    ADD CONSTRAINT "Analista_pkey" PRIMARY KEY (id);


--
-- Name: Causa Causa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_pkey" PRIMARY KEY (id);


--
-- Name: CausasImputados CausasImputados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CausasImputados"
    ADD CONSTRAINT "CausasImputados_pkey" PRIMARY KEY ("causaId", "imputadoId");


--
-- Name: CausasVictimas CausasVictimas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CausasVictimas"
    ADD CONSTRAINT "CausasVictimas_pkey" PRIMARY KEY ("causaId", "victimaId");


--
-- Name: Comuna Comuna_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comuna"
    ADD CONSTRAINT "Comuna_pkey" PRIMARY KEY (id);


--
-- Name: Delito Delito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Delito"
    ADD CONSTRAINT "Delito_pkey" PRIMARY KEY (id);


--
-- Name: Fiscal Fiscal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Fiscal"
    ADD CONSTRAINT "Fiscal_pkey" PRIMARY KEY (id);


--
-- Name: Foco Foco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Foco"
    ADD CONSTRAINT "Foco_pkey" PRIMARY KEY (id);


--
-- Name: Imputado Imputado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Imputado"
    ADD CONSTRAINT "Imputado_pkey" PRIMARY KEY (id);


--
-- Name: Nacionalidad Nacionalidad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Nacionalidad"
    ADD CONSTRAINT "Nacionalidad_pkey" PRIMARY KEY (id);


--
-- Name: Tribunal Tribunal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tribunal"
    ADD CONSTRAINT "Tribunal_pkey" PRIMARY KEY (id);


--
-- Name: Victima Victima_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Victima"
    ADD CONSTRAINT "Victima_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Causa Causa_abogadoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_abogadoId_fkey" FOREIGN KEY ("abogadoId") REFERENCES public."Abogado"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_analistaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_analistaId_fkey" FOREIGN KEY ("analistaId") REFERENCES public."Analista"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_comunaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_comunaId_fkey" FOREIGN KEY ("comunaId") REFERENCES public."Comuna"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_delitoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_delitoId_fkey" FOREIGN KEY ("delitoId") REFERENCES public."Delito"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_fiscalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_fiscalId_fkey" FOREIGN KEY ("fiscalId") REFERENCES public."Fiscal"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_focoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_focoId_fkey" FOREIGN KEY ("focoId") REFERENCES public."Foco"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_nacionalidadVictimaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_nacionalidadVictimaId_fkey" FOREIGN KEY ("nacionalidadVictimaId") REFERENCES public."Nacionalidad"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Causa Causa_tribunalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Causa"
    ADD CONSTRAINT "Causa_tribunalId_fkey" FOREIGN KEY ("tribunalId") REFERENCES public."Tribunal"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CausasImputados CausasImputados_causaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CausasImputados"
    ADD CONSTRAINT "CausasImputados_causaId_fkey" FOREIGN KEY ("causaId") REFERENCES public."Causa"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CausasImputados CausasImputados_imputadoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CausasImputados"
    ADD CONSTRAINT "CausasImputados_imputadoId_fkey" FOREIGN KEY ("imputadoId") REFERENCES public."Imputado"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CausasVictimas CausasVictimas_causaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CausasVictimas"
    ADD CONSTRAINT "CausasVictimas_causaId_fkey" FOREIGN KEY ("causaId") REFERENCES public."Causa"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CausasVictimas CausasVictimas_victimaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CausasVictimas"
    ADD CONSTRAINT "CausasVictimas_victimaId_fkey" FOREIGN KEY ("victimaId") REFERENCES public."Victima"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Imputado Imputado_nacionalidadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Imputado"
    ADD CONSTRAINT "Imputado_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES public."Nacionalidad"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Victima Victima_nacionalidadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Victima"
    ADD CONSTRAINT "Victima_nacionalidadId_fkey" FOREIGN KEY ("nacionalidadId") REFERENCES public."Nacionalidad"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

