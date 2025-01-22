--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-22 09:33:32

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
-- TOC entry 5109 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: Abogado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Abogado" (id, nombre) FROM stdin;
2	Juan Pablo Gonzáles
3	Maria Veronica Castro
4	Patricio López
5	Equipo Jurídico
6	No Aplica
7	No Definido
1	Cargo no provisto (MCaceres)
\.


--
-- TOC entry 5111 (class 0 OID 16403)
-- Dependencies: 219
-- Data for Name: Actividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Actividad" (id, causa_id, tipo_actividad_id, usuario_id, "fechaInicio", "fechaTermino", estado, "createdAt", "updatedAt", observacion) FROM stdin;
3	14	3	2	2024-11-26 00:00:00	2024-11-26 00:00:00	terminado	2024-12-18 14:22:23.588	2024-12-18 14:22:23.588	reporte de monitoreo Nro. 4, el el cual contiene análisis de la información contenida en pendrive y microSD, asociados a NUE 6862827 
5	104	5	2	2024-10-10 00:00:00	2024-10-16 00:00:00	terminado	2024-12-19 19:40:00	2024-12-19 19:40:00	Importado desde Teams: RUC 2401114980-0 OFICIO BANCO ESTADO  
6	34	1	2	2024-08-14 00:00:00	2024-09-09 00:00:00	terminado	2024-12-20 19:40:00	2024-12-20 19:40:00	Importado desde Teams: Analisis de trafico RUC 2400606321-3 el amanecer
7	40	2	2	2024-07-18 00:00:00	2024-07-18 00:00:00	terminado	2024-12-21 19:40:00	2024-12-21 19:40:00	Importado desde Teams: EXTRACCION FORENSE RUC 2400718295-K
8	31	5	2	2024-05-24 00:00:00	2024-05-24 00:00:00	terminado	2024-12-22 19:40:00	2024-12-22 19:40:00	Importado desde Teams: Informe Monitoreo Blue Rain RUC 2400478139-9
9	14	5	2	2024-11-27 00:00:00	2024-11-27 00:00:00	terminado	2024-12-23 19:40:00	2024-12-23 19:40:00	Importado desde Teams: CAUSA BLEST GANA RUC 2400175742-K REPORTE MONITOREO
12	32	1	2	2024-10-01 00:00:00	2024-10-04 00:00:00	terminado	2024-12-26 19:40:00	2024-12-26 19:40:00	Importado desde Teams: RUC 2400481752-0 Fourteen Years, generar informe georreferencial lugar de trabajo y SS
14	22	5	2	2024-08-16 00:00:00	2024-08-30 00:00:00	terminado	2024-12-28 19:40:00	2024-12-28 19:40:00	Importado desde Teams: RUC 2400362167-3 Diligencia forense y de analisis / femicidio intimo ocurrido en Ovalle el 31/03/2024
16	40	2	2	2024-07-23 00:00:00	2024-07-23 00:00:00	terminado	2024-12-30 19:40:00	2024-12-30 19:40:00	Importado desde Teams: EXTRACCION TELEFONO RUC 2400718295-K ZIG-ZAG
17	34	1	2	2024-06-10 00:00:00	2024-06-10 00:00:00	terminado	2024-12-31 19:40:00	2024-12-31 19:40:00	Importado desde Teams: RUC 2400606321-3 EL amanecer Georreferencia  Track 
18	31	5	2	2024-05-02 00:00:00	2024-05-02 00:00:00	terminado	2025-01-01 19:40:00	2025-01-01 19:40:00	Importado desde Teams: RUC:2400478139-9, Blue Rain Analisis de videos
19	57	1	2	2024-05-08 00:00:00	2024-05-08 00:00:00	terminado	2025-01-02 19:40:00	2025-01-02 19:40:00	Importado desde Teams: RUC 2000164821-8, GEOREFERENCIACION Y ANALISIS
20	31	2	2	2024-04-29 00:00:00	2024-04-29 00:00:00	terminado	2025-01-03 19:40:00	2025-01-03 19:40:00	Importado desde Teams: RUC:2400478139-9, Blue Rain, extracci�n Forense
21	32	5	2	2024-04-29 00:00:00	2024-04-29 00:00:00	terminado	2025-01-04 19:40:00	2025-01-04 19:40:00	Importado desde Teams: RUC 2400481752-0, Fourteen years informe tempranos de analisis
22	22	2	2	2024-04-11 00:00:00	2024-04-19 00:00:00	terminado	2025-01-05 19:40:00	2025-01-05 19:40:00	Importado desde Teams: RUC 2400362167-3, Ruleta Rusa, reporte de extraccian y analisis.
23	22	5	2	2024-04-18 00:00:00	2024-04-19 00:00:00	terminado	2025-01-06 19:40:00	2025-01-06 19:40:00	Importado desde Teams: RUC 2400362167-3, Ruleta Rusa, reporte analisis criminal
13	34	2	2	2024-05-28 00:00:00	2024-06-13 00:00:00	terminado	2024-12-27 19:40:00	2024-12-18 20:31:35.91	Importado desde Teams: RUC 2400606321-3 El Amanecer Extracción Teleofonica
11	25	2	2	2024-05-30 00:00:00	2024-07-23 00:00:00	terminado	2024-12-25 19:40:00	2024-12-18 21:54:40.521	Importado desde Teams: CAUSA RUC 2400401487-8 Limpiaparabrisas. Revision y análisis telefonos  
15	79	5	2	2024-08-19 00:00:00	2024-08-19 00:00:00	terminado	2024-12-29 19:40:00	2024-12-18 21:54:46.217	Importado desde Teams: Gestión de preservacion y registro META RUC 2400505286-2
10	82	5	2	2024-10-22 00:00:00	2024-10-22 00:00:00	terminado	2024-12-24 19:40:00	2024-12-18 22:17:26.276	Importado desde Teams: Palza Barnes RUC 2401233454-7, solictar trafico IMEI
4	102	2	2	2024-12-16 00:00:00	2024-12-20 00:00:00	en_proceso	2024-12-18 19:40:28.419	2024-12-30 14:56:29.354	Extracción telefono imputado ALEXIS ANTONIO SIERRA CASTRILLON,  Device Name: Samsung SM-J610g DS Galaxy J6+ 2018 Duos TD-LTE
\.


--
-- TOC entry 5113 (class 0 OID 16411)
-- Dependencies: 221
-- Data for Name: Analista; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Analista" (id, nombre) FROM stdin;
1	Rafael Ramos Aqueda
4	Barbara León Manriquez
5	No Definido
3	Cargo no provisto-(HAstudillo) 
2	Cargo no provisto (HDiaz) 
\.


--
-- TOC entry 5115 (class 0 OID 16417)
-- Dependencies: 223
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Area" (id, nombre, descripcion, activo, "createdAt", "updatedAt") FROM stdin;
1	Análisis	Área de análisis de información	t	2024-12-06 09:33:53.868	2024-12-06 09:33:53.868
2	Jurídica	Área jurídica y legal	t	2024-12-06 09:33:53.868	2024-12-06 09:33:53.868
3	Proteccional	Área de protección	t	2024-12-06 09:33:53.868	2024-12-06 09:33:53.868
\.


--
-- TOC entry 5117 (class 0 OID 16425)
-- Dependencies: 225
-- Data for Name: Causa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Causa" (id, "denominacionCausa", ruc, "fechaDelHecho", rit, "fechaIta", "numeroIta", "fechaPpp", "numeroPpp", observacion, foliobw, "causaEcoh", "causaLegada", "coordenadasSs", "homicidioConsumado", "constituyeSs", "sinLlamadoEcoh", "fechaHoraTomaConocimiento", "comunaId", "analistaId", "fiscalId", "focoId", "delitoId", "abogadoId", "tribunalId", "nacionalidadVictimaId", "esCrimenOrganizado") FROM stdin;
5	El Choclo	2300966740-7	2023-09-04 00:00:00	5788-2023	\N	0	\N	0	\N	s/n	f	t	-29.887723242884427, -71.13545836444163	t	f	\N	\N	7	1	1	1	1	1	1	\N	\N
6	El Pucho	2300191687-4	2023-02-18 00:00:00	741-2023	\N	0	\N	0	\N	S/N	f	t	\N	t	f	\N	\N	4	4	1	3	1	4	2	\N	\N
7	El Chuma	2200078130-8	2023-01-22 00:00:00	143-2022	\N	0	\N	0	\N	S/N	f	t	\N	t	\N	\N	\N	10	4	5	3	1	4	3	\N	\N
8	El Sultan	2400263895-5	2020-12-22 00:00:00	\N	\N	0	\N	0	(Homicidios Atribuidos A Banda De Ivan Mendieta 2001215082-3 ; 2001292529-9 ; 2001224076-8 ; 2201249797-4 ; 2301061608-5 ; 2301299336-6 ; 2001239229-0) El Sultan	s/n	f	t	\N	\N	\N	\N	\N	7	3	1	3	6	3	11	\N	\N
9	Asociacion Ilicita (Onur)	2301166765-1	2023-10-24 00:00:00	7203-2023	\N	0	\N	0	\N	S/N	f	t	\N	\N	\N	\N	\N	7	3	3	3	7	3	1	\N	\N
10	Craneo Las Animas	2400115315-K	2024-01-27 00:00:00	2971-2024	2024-01-28 00:00:00	1	\N	0	\N	s/n	f	f	\N	\N	\N	\N	\N	4	3	1	6	4	3	2	\N	\N
12	Pasaje Brasil	2400157209-8	2024-02-06 00:00:00	790-2024	\N	3	2024-02-27 00:00:00	1	Audiencia De Rebeldia Y Sobreseimiento Temporal 07/08/2024 A Las 0830	2024-2-6950	t	f	-29.882364404506045, -71.24215721541569	t	t	\N	\N	7	1	3	1	1	1	1	\N	\N
13	El Camino Amarillo	2400167162-2	2024-02-07 00:00:00	4494-2024	2024-02-08 00:00:00	4	2024-02-27 00:00:00	2	Mc Art 155 Kevin Eduardo Meneses Mundaca Clara Andrea Quintero Lopez \nJorge Manuel Torres Varas\nVerónica Lorena Garcia Zepeda\nC) La Firma Quincenal En Dependencias De La Fiscalía Local De La Serena.\nD) La Prohibición De Salir Del País.\n	2024-2-8875	t	f	-29.914445752634656, -71.22428084661519	t	t	\N	\N	7	1	1	1	1	1	1	\N	\N
14	Homicidio Blest Gana	2400175742-K	2024-02-08 00:00:00	602-2024	2024-02-10 00:00:00	5	2024-02-28 00:00:00	3	\N	 2024-2-10380	t	f	-30.609202571431066, -71.20035706449339	t	t	\N	\N	10	1	1	2	1	1	3	\N	\N
16	Homicidio Frustrado Vertedero	2400246746-8	2024-02-28 00:00:00	\N	\N	7	\N	0	No Corresponde A Ecoh	s/n	f	f	\N	f	t	\N	\N	4	4	1	6	1	4	2	\N	\N
19	Rapido Y Furioso	2400318400-1 	2024-03-17 00:00:00	1836-2024	2024-03-18 00:00:00	10	2024-04-09 00:00:00	7	\N	2024-3-22744	t	f	-29.907083065237387, -71.25712968226432	t	t	\N	\N	7	4	3	1	1	3	1	\N	\N
21	Secuestro El Paseo	2400358806-4	2024-03-27 00:00:00	1636-2024	2024-03-29 00:00:00	12	2024-04-10 00:00:00	12	Martes 30 De Abril Audiencia De Revisión De Prisión Preventiva. \nViernes 03 De Mayo Audiencia De Revisión De Plazo De Investigación 	2024-3-37818	t	f	-29.961799027831596, -71.25595182960566	\N	t	\N	\N	4	4	1	1	2	4	2	\N	\N
22	Ruleta Rusa Ovalle	2400362167-3	2024-03-29 00:00:00	780-2024	\N	13	2024-04-26 00:00:00	9	Obs.	2024-3-42680	t	f	-30.585982049271426, -71.19954071524707	t	t	\N	\N	10	1	1	2	1	1	3	\N	\N
23	Cuatrimoto	2400385593-3	2024-04-04 00:00:00	\N	\N	14	\N	0	\N	2024-4-5097	f	f	\N	\N	t	\N	\N	8	1	1	6	2	1	4	\N	\N
24	El Rito	2400401495-9	2024-04-07 00:00:00	\N	2024-04-08 00:00:00	15	\N	0	No Corresponde A Ecoh	2024-4-12047	f	f	\N	t	t	\N	\N	8	1	4	6	5	1	4	\N	\N
25	El Limpiaparabrisas	2400401487-8	2024-04-08 00:00:00	3172-2024	2024-04-09 00:00:00	16	\N	0	\N	2024-4-12015	t	f	-29.912596425993183, -71.22270705596885	t	t	\N	\N	7	4	1	1	1	4	1	\N	\N
26	El Pacto	2400415743-1	2024-04-09 00:00:00	526-2024	2024-07-12 00:00:00	17	2024-05-02 00:00:00	11	\N	2024-4-14606	t	f	-31.775866, -70.991556	t	t	\N	\N	8	1	4	2	1	1	1	\N	\N
27	Secuestro El Delivery	2400417889-7	2024-04-08 00:00:00	3669-2024	2024-04-12 00:00:00	18	2024-05-02 00:00:00	10	\N	2024-4-14893	t	f	-29.92472279876936, -71.25899316208688	\N	t	\N	\N	7	1	4	1	2	1	1	\N	\N
28	El Pantano	2400421251-3	2024-04-11 00:00:00	2382-2024	2024-04-13 00:00:00	19	2024-05-03 00:00:00	12	\N	2024-4-17839	t	f	-29.963015777147724, -71.33175263163861	t	t	\N	\N	4	3	1	1	1	3	2	\N	\N
29	Los Alcatraces 	2400453182-1	2024-04-20 00:00:00	\N	2024-07-21 00:00:00	20	\N	0	\N	2024-4-29076	f	f	\N	\N	t	\N	\N	4	4	3	6	4	4	11	\N	\N
31	Blue Rain 	2400478139-9	2024-04-25 00:00:00	2984-2024	\N	\N	2024-05-10 00:00:00	13	\N	2024-4-35494	t	f	-29.91236518953749, -71.25914165869527	t	t	\N	\N	7	1	4	1	1	1	2	\N	\N
32	Fourteen Years	2400481752-0	2024-04-28 00:00:00	2304-2024	2024-04-29 00:00:00	21	2024-05-10 00:00:00	14	Fija Pp Día 30 De Julio De 2024, A Las 10:30 Horas.\n, Se Fija La Audiencia Del Día 13 De Agosto De\n2024, A Las 09:30 Horas, Para Los Efectos De Resolver La Solicitud Formulada Por El \nMinisterio Público.	2024-4-39038	t	f	-29.962807089146086 ,  -71.3336312658804	t	t	\N	\N	4	1	4	1	1	1	2	\N	\N
34	El Amancer	2400606321-3	2024-05-28 00:00:00	615-2024	2024-05-29 00:00:00	26	\N	\N	Se Realiza Primer Intento De Detencion Del Suejto, Este No Fue Encotnrado, El Sujeto Se Saca La Tobillera De Control Telematico, Victima En Estado Reservado Fuera De Riesgo Vital	2024-5-33753	t	f	-31.315369749246468, -71.3502919660111	t	t	\N	\N	2	1	1	2	1	1	4	\N	\N
35	Puerto Principal	2300605459-5	2023-06-03 00:00:00	2508-2023	\N	\N	\N	\N	\N	SN	f	t	-29.953861314058038, -71.33682071439725	t	\N	\N	\N	4	3	1	3	1	3	2	\N	\N
37	Noche De Furia	2400638256-4	2024-06-04 00:00:00	4062-2024	2024-06-05 00:00:00	28	2024-06-14 00:00:00	19	Imputada Mariangela Del Carmen Gonzalez Carrasco, Formalizada 06-06-2024 Se Fija Un Plazo De Investigación De 105 Días.	2024-64187	t	f	-29.910005786914976, -71.2571304528157	t	t	\N	\N	7	4	2	1	1	4	1	\N	\N
2	River Lider	2301299336-6	2023-11-26 00:00:00	5929-2023	2023-11-27 00:00:00	3	2023-11-27 00:00:00	2	Plazo Vencido 11/09/2024	SN	t	f	-29.96183138648497, -71.26033025328815	f	t	\N	2023-11-26 04:09:00	4	3	3	1	1	3	2	\N	\N
30	Toma Los Changos 	2400457063-0	2024-04-21 00:00:00		2024-04-22 00:00:00	21	\N	0		2024-4-29775	f	f	-29.883097625415942, -71.23300087413627	\N	t	\N	2024-04-22 19:45:00	4	4	3	6	3	4	11	\N	\N
20	Homicidio Fustrado El Arrayan	2400338773-5	2024-03-24 00:00:00		2024-03-25 00:00:00	11	\N	0		2400336773-5	f	f		f	t	\N	2024-03-25 00:11:00	7	4	4	1	1	4	1	\N	\N
38	Capitan Palta	2400638367-6	2024-06-04 00:00:00	\N	2024-06-06 00:00:00	29	\N	\N	\N	SN	t	f	-30.588382, -71.168617	t	t	\N	\N	10	3	3	2	1	3	3	\N	\N
4	Secuestro La Herradura	2301344616-4	2023-12-05 00:00:00	6101-2023	2023-12-07 00:00:00	5	2024-01-03 00:00:00	5		S/N	t	f	-29.97311751876197, -71.3686963026747	f	t	\N	2025-01-22 12:19:00	4	4	3	1	2	4	2	\N	\N
11	Suicidio Alfalfares	2400136612-9	2024-01-30 00:00:00	\N	2024-02-01 00:00:00	2	\N	0	\N	s/n	f	f	\N	\N	t	\N	\N	7	4	8	6	4	4	1	\N	\N
17	Homicidio El Caddie	2400283076-7	2024-03-11 00:00:00	1310-2024	2024-03-12 00:00:00	8	2024-04-08 00:00:00	5	\N	2024-3-12550	t	f	-29.979544333528263, -71.28849316425519	t	t	\N	\N	4	4	2	1	1	4	2	\N	t
36	Los Salamanca	2400627403-6	2024-06-01 00:00:00	1763-2024	2024-06-04 00:00:00	27	\N	\N	Audiencia De Cautela De Garantías \nPara El Día 31 De Julio De 2024, A Las 10:30 Horas, A Fin De Debatir El Eventual Traslado Del Imputado Álvaro Alejandro Castillo Araya A Un Recinto Penitenciario Diverso	2024-6-2152	t	f	 -30.574055, -70.880010	\N	t	\N	\N	13	4	2	2	2	4	3	\N	t
3	El Galpon	2301320508-6	2023-11-29 00:00:00	6032-2023	2023-12-01 00:00:00	4	2023-01-03 00:00:00	4	Plazo De Investigación Vence El 07 De Septiembre 	SN	t	f	-29.956529269502706, -71.33916396062831	t	t	\N	2025-01-21 21:56:00	4	3	3	1	1	3	2	\N	\N
39	Kamikaze	2400688944-8	2024-06-16 00:00:00	4443-2024	2024-06-17 00:00:00	30	2024-06-19 00:00:00	20	La Segunda Victima Corresponde A Alexander Rigoberto Pereira Maldonado. Rut: 21.450.371-9	2024-6-20293	t	f	-29.932962536752097, -71.28156611077749	t	t	\N	\N	7	4	2	1	1	4	1	\N	\N
40	Zig Zag	2400718295-K	2024-06-23 00:00:00	3605-2024	2024-06-24 00:00:00	31	\N	\N	\N	2024-6-29499	t	f	-29.940638,-71.338623	t	t	\N	\N	4	1	1	1	1	1	2	\N	\N
41	Huachalalume S/N La Serena	2400201951-1	2024-02-15 00:00:00	4304-2024	\N	\N	\N	\N	Muerte En Recinto Penitenciario	s/n	f	f	-29.978487668411763, -71.21665791984894	t	\N	\N	\N	7	1	1	1	1	1	1	\N	\N
42	Homicio Via Publica Illapel	2400487448-6	2024-04-29 00:00:00	487-2024	\N	\N	\N	\N	\N	 2024-4-40052	f	f	-31.631232484199632, -71.16491856261085	t	\N	\N	\N	5	5	6	6	1	6	5	\N	\N
43	Salamanca Año Nuevo	2400005713-0	2024-01-02 00:00:00	1-2024	\N	\N	\N	\N	\N	S/N	f	f	-31.785005583411202, -70.96915725098108	t	\N	t	\N	14	5	6	6	1	6	5	\N	\N
44	Homicidio En Riña O Pelea Combarbala	2400141422-0	2024-02-03 00:00:00	86-2024	\N	\N	\N	\N	\N	S/N	f	f	-30.957089834930613, -71.06964820915586	t	\N	t	\N	3	1	9	6	1	1	6	\N	\N
45	Homicidio Parque Urbano Cerro Grande	2400760588-5	2024-07-03 00:00:00	5012-2024	2024-07-04 00:00:00	33	2024-07-22 00:00:00	22	Se Amplía La Detención Hasta El Día 05 De Julio De 2024, A Las 11:00 Horas, Con El Fin De Realizar La Audiencia De Formalización. 	2024-2803	t	f	\N	t	t	f	\N	7	3	3	1	1	3	1	\N	\N
46	Homicidio Alfalfares	2400764779-0	2024-07-03 00:00:00	5026-2024	2024-07-04 00:00:00	34	\N	\N	\N	2024-7-2920	t	f	\N	t	t	f	\N	7	4	2	1	1	4	1	\N	\N
47	Homicidio Club Bellavista	2400795451-0	2024-07-10 00:00:00	2248-2024	2024-07-11 00:00:00	35	2024-07-26 00:00:00	25	\N	2024-7-11747	t	f	\N	t	t	f	\N	10	3	4	2	1	3	3	\N	\N
48	El Carpintero Parque Coll	2400643704-0	2024-06-03 00:00:00	\N	2024-07-03 00:00:00	32	\N	\N	\N	2024-6-3360	t	f	-29.909042, -71.235159	t	t	f	\N	7	2	2	1	1	2	1	\N	\N
49	Homicidio Dr.	2400795108-2	2024-07-11 00:00:00	5321-2024	2024-07-12 00:00:00	36	2024-07-29 00:00:00	26	 Audiencia De Prueba Anticipada, La Que Se Fija Para El Día 31 De Julio De 2024, A Las 10 00\nHoras.	2024-7-13677	t	f	\N	t	t	f	\N	7	3	4	1	1	3	1	\N	\N
50	Kilometro 512	2400812129-6	2024-07-13 00:00:00	5476-2024	2024-07-15 00:00:00	37	\N	\N	\N	2024-7-16541	t	f	-29.608625,-71.259354	t	t	f	\N	6	4	1	1	4	4	1	\N	\N
51	El Pipa	2400506928-5	2024-05-04 00:00:00	\N	2024-05-04 00:00:00	24	\N	\N	\N	2024-5-4561	f	f	\N	f	t	f	\N	4	1	1	7	4	1	2	\N	\N
52	Cariño Malo	2400873685-1	2024-07-27 00:00:00	\N	2024-07-30 00:00:00	38	2024-08-09 00:00:00	27	\N	2024-7-35984	t	f	-29.872185902852195, -71.23384535557469	t	t	f	\N	7	3	5	2	1	3	1	\N	\N
53	Homicidio Tia Rica	2400874257-6	2024-07-29 00:00:00	5933-2024	2024-07-30 00:00:00	39	2024-08-09 00:00:00	28	\N	2024-7-38438	t	f	-29.905681147264783, -71.25021150196343	t	t	f	\N	7	3	5	2	1	3	1	\N	\N
55	Caso Avenida Brasil	2400896910-4	2024-07-30 00:00:00	\N	2024-08-02 00:00:00	40	\N	\N	\N	2024-7-42376	t	f	\N	t	t	f	\N	4	3	5	7	4	3	2	\N	\N
56	 Los Palos	2110027265-K	2021-06-23 00:00:00	\N	\N	\N	\N	\N	\N	SN	t	t	\N	f	f	f	\N	\N	1	1	3	1	1	11	\N	\N
57	La Cabaña	2000164821-8	2020-02-11 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	\N	1	\N	6	1	1	11	\N	\N
58	Infiernillo	2210014316-3	2022-03-17 00:00:00	\N	\N	\N	\N	\N	\N	sn	f	t	\N	t	t	f	\N	\N	1	4	3	1	1	5	\N	\N
59	Retroexcavadora	 2300552624-8	2023-05-20 00:00:00	\N	\N	\N	\N	\N	\N	sn	f	t	\N	t	f	f	\N	\N	1	4	6	1	1	11	\N	\N
60	Tda	 2301049250-5	2023-09-25 00:00:00	\N	\N	\N	\N	\N	\N	sn	f	t	\N	f	f	f	\N	8	4	2	3	2	4	2	\N	\N
62	Turbazos	 2400571267-6	2024-05-16 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	f	f	f	\N	7	4	2	7	6	4	11	\N	\N
63	Maria Jose Zambra	 1900943146-5	2019-08-19 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	7	1	\N	6	1	1	11	\N	\N
64	Didier	 2201249797-4	2022-12-12 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	7	3	5	2	1	3	1	\N	\N
65	Habitación 4	2401018273-1	2024-08-27 00:00:00	\N	2024-08-28 00:00:00	42	\N	\N	\N	2024-8-36429	t	f	-29.9483452, -71.2898534	t	t	f	2024-08-27 05:25:00	\N	1	1	1	4	1	2	\N	\N
66	El Maradona	2401033687-9	2024-08-31 00:00:00	7026-2024	2024-10-02 00:00:00	45	2024-10-14 00:00:00	32	\N	2024-8-42601	t	f	\N	t	t	f	2024-10-31 01:30:00	\N	3	5	1	1	3	1	\N	\N
67	La Calera	2401035420-6	2024-08-31 00:00:00	\N	2024-09-02 00:00:00	46	\N	\N	\N	2024-8-43192	t	f	\N	t	t	f	\N	\N	3	5	1	4	3	11	\N	\N
68	Yerba Mala	2401114980-0	2024-09-17 00:00:00	\N	2024-09-17 00:00:00	47	\N	\N	\N	2024-09-25504	t	f	-30.602809644488076, -71.18605210827299	t	t	f	2024-09-17 06:00:00	\N	1	4	2	1	1	11	\N	\N
69	Petardos	2401116347-1	2024-09-18 00:00:00	\N	2024-09-19 00:00:00	48	\N	\N	Homicidio Frustrado	2024-9-27822	t	f	-29.881137407660297, -71.22593074860282	t	t	f	2024-09-18 15:40:00	\N	1	4	2	1	1	11	\N	\N
70	Jote Veloz	2401116349-8	2024-09-18 00:00:00	\N	2024-09-19 00:00:00	49	\N	\N	Homicidio Frustrado	2024-9-27995	t	f	-29.872618789593552, -71.24918637564237	t	t	f	2024-09-18 17:00:00	\N	1	4	1	1	1	11	\N	\N
73	Del Molino 	2401214712-7	2024-10-07 00:00:00	\N	2024-10-09 00:00:00	52	\N	\N	\N	2024-10-11461	t	f	\N	t	t	f	2024-10-07 20:15:00	\N	2	10	2	7	2	3	\N	\N
74	Copec Socos Ruta 5	2401215056-K	2024-10-07 00:00:00	\N	2024-10-09 00:00:00	53	\N	\N	\N	2024-10-11536	t	f	\N	t	t	f	2024-10-07 21:00:00	\N	2	10	2	2	2	3	\N	\N
75	Brasil 715	2401222264-1	2024-10-08 00:00:00	\N	2024-10-10 00:00:00	54	\N	\N	\N	2024-10-13050	t	f	\N	t	t	f	2024-10-08 21:00:00	\N	4	4	1	7	4	1	\N	\N
76	Prehistoria	2400911411-0 	2024-10-04 00:00:00	\N	2024-10-04 00:00:00	42	2024-09-11 00:00:00	30	\N	2024-8-4147	t	f	\N	t	t	f	2024-10-04 09:00:00	\N	3	1	1	1	3	1	\N	\N
77	La Vendetta	2400315064-6	2024-03-18 00:00:00	697-2024	\N	\N	\N	\N	\N	2024-3-23214	t	f	\N	t	f	f	2024-03-18 08:30:00	\N	3	3	1	2	3	3	\N	\N
78	La Bendicion	2400291853-2	2024-03-02 00:00:00	1936-2024	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	2024-03-01 19:00:00	\N	3	3	7	7	3	3	\N	\N
79	Trafico De Armas	2400505286-2	2024-05-03 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	\N	3	3	7	7	3	11	\N	\N
80	Disparos Injustificados	2400026284-2	2024-01-03 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	\N	3	3	7	7	3	1	\N	\N
81	Trata De Personas	2200065681-3	2022-01-19 00:00:00	5001-2022	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	\N	3	3	7	7	3	1	\N	\N
82	Plaza Barnes	2401233454-7	2024-10-12 00:00:00	\N	2024-10-13 00:00:00	55	\N	\N	\N	2024-10-18875	t	f	-30.26269453238632, -71.49241251293884	t	t	f	2024-10-12 03:30:00	\N	1	3	6	1	1	11	\N	\N
83	La Nota	2401068872-4	2024-09-07 00:00:00	\N	2024-09-09 00:00:00	47	\N	\N	\N	2024-9-10402	t	f	\N	f	t	f	2024-09-07 12:25:00	\N	4	3	7	4	4	1	\N	\N
84	Blanche	2401241347-1	2024-10-14 00:00:00	\N	\N	56	\N	\N	\N	2024-10-21642	t	f	-29.932978402906283, -71.24951736765563	t	t	f	2024-10-13 20:30:00	\N	1	3	7	1	1	11	\N	\N
72	Calle Almagro	2401163102-5	2024-10-30 00:00:00	8224-2024	2024-10-01 00:00:00	51	2024-10-14 00:00:00	33		2024-09-44715 	t	f	-29.898873957204856, -71.24254781646408	t	t	f	2024-10-30 05:30:00	\N	3	1	1	1	3	1	\N	\N
87	Secuestro Yeral	2401120911-0	2024-09-19 00:00:00	\N	\N	\N	\N	\N	\N	S/N	t	f	\N	f	f	f	\N	\N	1	4	6	2	1	11	\N	\N
88	Arista Causa Zigzag  	2401051803-9	2024-09-04 00:00:00	\N	\N	\N	\N	\N	\N	S/N	t	f	\N	f	f	f	\N	\N	1	4	6	7	1	11	\N	\N
61	Pantan	  2300468251-3	2022-12-19 00:00:00	\N	\N	\N	\N	\N	\N	SN	f	t	\N	t	f	f	\N	8	1	4	4	7	1	11	\N	t
89	Secuestro Reversa	2401016211-0	2024-08-28 00:00:00	\N	\N	43	\N	\N	\N	SN	t	f	\N	t	t	f	\N	\N	1	4	1	2	1	1	\N	\N
90	Secuestro La Garza	2401120474-7	2024-09-21 00:00:00	\N	\N	\N	\N	\N	\N	S/N	t	f	\N	f	f	f	\N	\N	1	4	6	7	1	11	\N	\N
92	Atentado Contra Sasha Mendieta	2400987629-0	2024-08-18 00:00:00	\N	\N	\N	\N	\N	\t\tI	S/N	t	f	\N	f	f	f	\N	\N	3	1	3	7	3	1	\N	\N
93	Sasha, Arista Lavado	2400676896-9	2024-06-16 00:00:00	\N	\N	\N	\N	\N	Causa Heredada De Ecoh 2 Limarí	S/N	t	f	\N	f	f	f	\N	\N	3	1	3	6	3	1	\N	\N
94	Sasha, Narcofuneral	2400945768-9	2024-08-07 00:00:00	\N	\N	\N	\N	\N	\N	S/F	t	f	\N	f	f	f	\N	\N	3	1	3	7	3	1	\N	\N
95	Brothers	2401308796-9	2024-10-27 00:00:00	\N	2024-10-28 00:00:00	59	\N	\N	\N	2024_10_44394	t	f	-29.965932080636655, -71.2623657538494	f	t	f	2024-10-26 23:01:00	\N	3	1	7	3	3	2	\N	\N
96	Cejitas	2401249787-K	2024-10-15 00:00:00	3562	2024-10-16 00:00:00	57	\N	\N	\N	2024-10-24950	t	f	-30.5872524, -71.1839875	t	t	f	2024-10-16 04:30:00	\N	2	7	2	3	2	3	\N	\N
97	Las Mulas	2401318113-2	2024-10-29 00:00:00	3707	2024-10-30 00:00:00	60	\N	\N	\N	2024-10-47861	t	f	-308655700. -70.9983060	t	t	f	2024-10-29 07:10:00	\N	2	10	2	1	2	3	\N	\N
98	Lesiones Graves Tahuinco	2401343200-3	2024-11-03 00:00:00	\N	2024-11-05 00:00:00	61	\N	\N	Lesiones Por Arma De Fuego En Via Publica, Localidad De Tahuinco	2024-11-3274	t	f	-31.789106,  -71.0595362	f	f	f	2024-11-02 22:20:00	\N	2	6	6	3	2	5	\N	\N
15	 Psje San Gregorio	2400200962-1	2024-02-15 00:00:00	962-2024	2024-02-16 00:00:00	6	\N	4		2024-2-20186	f	f	-29.967782779382713, -71.26186140017585	f	t	\N	2024-11-15 12:57:00	4	1	4	1	1	1	2	\N	\N
71	Caleta San Pedro	2401145550-2	2024-09-26 00:00:00		2024-09-27 00:00:00	50	\N			2024-09-39710	t	f	-29.888485654506702, -71.27275446064355	t	t	f	2024-09-26 22:20:00	\N	3	2	1	4	3	2	\N	\N
113	PARRICIDIO CAIMANES	2401517837-6	2024-12-08 00:00:00	\N	2024-12-10 00:00:00	66	\N	\N	IMPUTADO\tIVÁN LUIS MENESES LEYTON\nVICTIMA  MARCIAL DEL CARMEN MENESES CASTRO	2024-12-13031	f	f	-31.92690, -71.13642	f	t	\N	2024-12-09 02:23:00	\N	\N	\N	\N	\N	\N	5	\N	\N
114	EL MINERO	2401512240-0	2024-12-08 00:00:00	\N	2024-12-10 00:00:00	68	\N	\N	Posible suicidio, exploción en mina Santa Rosa de Quebrada de talca.	2024-12-11980	t	f	-30.034128 , -71.021575	f	t	\N	2024-12-08 14:00:00	\N	\N	\N	\N	\N	\N	1	\N	\N
101	VOY VUELVO	2401478411-6	2024-12-02 00:00:00		2024-12-02 00:00:00	64	\N			2024-11-50393	f	f	-29.988177289846007, -71.34130067413275	\N	t	\N	2024-12-03 05:35:00	\N	4	3	\N	2	4	2	\N	\N
102	Homicidio Barrio Ingles	2401526890-1	2024-12-07 00:00:00		2024-12-08 00:00:00	67	2024-12-11 00:00:00		RUC 2401512290-7 y  2401526890-1	2024-12-11759	t	f	 -29.948862074787957, -71.33642911911537	\N	t	\N	2024-12-08 13:30:00	\N	1	2	1	1	2	2	\N	\N
103	Las Orizas	2401537018-8	2024-12-11 00:00:00	7505-2024	2024-12-12 00:00:00	70	\N			2024-12-18261	t	f	-29.975227121141764, -71.34071677549956	\N	t	\N	2024-12-12 07:00:00	\N	1	2	1	1	3	2	\N	\N
104	ARISTA CASO AMANECER	2401214022-K	2024-10-10 00:00:00	\N	\N	\N	\N	\N	CAUSA ORIGINADA COMO ARISTA EN INVESTIGACION RUC 2400606321-3.	\N	t	f	\N	\N	f	\N	2024-10-10 02:12:00	\N	\N	\N	2	\N	\N	4	\N	\N
1	Descuartizado	2301259952-8	2023-11-16 00:00:00	5733-2023	2023-11-18 00:00:00	1	2023-11-28 00:00:00	1	Audiencia Apercibimiento Cierre Para El Día 25-10-24 A Las 1030	S/N	t	f	-29.952580680700397, -71.33547007704335	t	t	\N	2023-11-19 08:32:00	4	1	3	1	1	1	2	\N	\N
105	Quebrada Venavente	2400119572-3	2023-12-07 00:00:00	\N	\N	\N	\N	\N	INVESTIGACIÓN POR POSIBLE DELITO DE TRÁFICO DE DROGA SY TENENCIA ILEGAL DE ARMAS DE FUEGO POR SUJETOS QUE MANTIENEN DOMICILIO EN QUBERADA DE BENAVENTE.\n\n	S/N	f	f	\N	f	f	\N	2024-01-29 20:00:00	\N	\N	\N	\N	\N	\N	2	\N	\N
107	Arista Los Tambores	2401113510-9	2024-09-17 00:00:00	\N	\N	\N	\N	\N	Secuestro, ley 20.000 y Ley 17.798, no judicializada, reservada. 	SN	t	f	\N	f	f	\N	2924-09-18 00:56:00	\N	\N	\N	\N	\N	\N	\N	\N	\N
115	EL CONQUISTADOR	2401590823-4	2024-12-23 00:00:00		2024-12-26 00:00:00	71	\N		VICTIMA Fernando Antonio Barraza García  16.848.324-4		t	f	-30.600338, -71.196492	t	t	\N	2024-12-23 09:08:00	\N	\N	\N	2	1	\N	3	\N	\N
109	Arista Amenaza ZIG-ZAG	2400936534-2	2024-08-05 00:00:00	\N	\N	\N	\N	\N	JOSE MANUEL DIAZ OGALDE, CÉDULA DE IDENTIDAD NRO. 18.317.321-9, maniefiesta: OY A VENIR EN PATOTA CON MIS AMIGOS Y TE VOY ,A DEJAR LA CAGA EN TU CASA FEA CULIA, YE VOY A REVENTAR TU CASA FEA CULIA	S/N	t	f	\N	f	f	\N	2024-08-05 20:45:00	\N	\N	\N	\N	\N	\N	2	\N	\N
108	MERCEDES	2401609236-K	2024-12-29 00:00:00		2024-12-30 00:00:00	72	\N		VICTIMAS. JOAQUÍN RODRIGO PUELLES CARRAZANA, RUN  20006271-K, Nacionalidad Chilena, quien ingresa 18:15 y IGNACIO ALEJANDRO ROBLEDO, RUN: 19207388-K, Nacionalidad Chilena, quien ingresa a 18:16.	2024-12-48634	t	f	-29.9694195854504, -71.32914874937038	t	t	\N	2024-12-30 10:30:00	\N	\N	\N	1	1	\N	2	\N	\N
110	Queridos Vecinos	2401366546-6	2024-11-09 00:00:00	\N	2024-11-09 00:00:00	62	\N	\N	Victima JUAN CARLOS CAMPAÑA SILVA 18566477-5, homicidio frustrado Arma Blanca	2024-11-13798	t	f	-29.88423274182656, -71.21683164082205	f	t	\N	2024-11-09 16:09:00	\N	\N	\N	1	\N	\N	1	\N	\N
100	BACHELET	2401449381-2	2024-11-27 00:00:00		2024-11-28 00:00:00	63	\N			2024-11-42112	t	f	-30.590562263175, -71.17570719622255	f	t	\N	2024-11-27 17:30:00	\N	3	\N	2	1	3	3	\N	\N
111	SECUESTRO LOS GALGOS	2401484971-4	2024-12-02 00:00:00	\N	2024-12-10 00:00:00	65	\N	\N	VICTIMA FABIAN PATRICIO HEYER ARIAS Y  NICOLAS ALFONSO MACIAS MARIN 16.468.371-0, 15.909.557-6, AMBOS CHILENOS	2024-12-3020	t	f	-29.902984, -71.252451	f	t	\N	2024-12-02 23:41:00	\N	\N	\N	1	\N	\N	1	\N	\N
112	Arbol Huacho	2401510617-0	2024-12-06 00:00:00	\N	2024-12-07 00:00:00	66	\N	\N	Dos personas sexo masculino, ingresan a zona de recolección de machas, ambos se ahogan. VICTIMA\t\nJUAN PABLO VILCHES OPAZO\n20126954-7 \t\t\t \nEDWIN ALEXANDER BARRUETO BERNAL Colombiano, DNI 1022431484	SN	t	f	-30.285181296656226, -71.51382279397397	f	t	\N	2024-12-06 16:53:00	\N	\N	\N	\N	\N	\N	2	\N	\N
117	CAJITA FELIZ (LESIONES GRAVES)	2401008147-1	2024-08-23 00:00:00	\N	2024-09-04 00:00:00	44	\N	\N	VICTIMA\t21831682-4\tALEXANDER MANUEL CANTILLANA FERNÁNDEZ\nABOGADO QUERELLANTE\t11823822-2\tMARCELO RAFAEL GALVEZ TORRES	2024-8-30670	t	f	-29.96830918226281, -71.307144667906	f	t	\N	2024-08-23 08:52:00	\N	\N	\N	1	\N	\N	2	\N	\N
116	DEPARTAMENTOS ROJOS Cancha 	2401558202-9	2024-12-17 00:00:00		2024-12-18 00:00:00	73	\N		VICTIMA\t15166814-3\tSERGIO ALEJANDRO CASTRO CASTRO\tCHACABUCO No. 1683, POBLACION EL LIBERTADOR, LAS COMPAÑÍAS, LA SERENA\t/ 949911876\t20/03/2001\t24 AÑOS\tCHILE\t\t\n \nVICTIMA\t21366648-7\tFERNANDO EDUARDO MELLA BLAMEY	2024-12-26998	t	f	-29.882178703193674, -71.24253961095063	t	t	\N	2024-12-17 13:29:00	\N	\N	\N	1	1	\N	1	\N	\N
18	Homicidio La Diva	2400310135-1 	2024-03-15 00:00:00	665-2024	2024-03-16 00:00:00	9	2024-04-08 00:00:00	6	\N	2024-3-19622	t	f	-30.6018863,-71.2048707	t	t	\N	\N	10	3	3	2	1	3	3	\N	t
33	Los Primos	2400531541-3	2024-05-10 00:00:00	\N	2024-05-10 00:00:00	25	\N	\N	Agrupado A Ruc 2301338343-K	2024-5-9268	t	f	 -30.219930, -71.363011	\N	t	\N	\N	4	1	1	1	4	1	2	\N	t
86	Diamante Verde	2201180094-0	2022-08-18 00:00:00	\N	\N	\N	\N	\N	\N	S/N	t	t	\N	f	f	f	\N	\N	1	4	5	7	1	11	\N	t
54	Los Tambores	2400911606-7	2024-08-03 00:00:00	4400-2024	2024-08-05 00:00:00	41	2024-09-11 00:00:00	29	La Victima Se Encuentra En Recuperación En El Hospital De Coquimbo	2024-8-3644	t	f	\N	t	t	f	2024-08-04 00:00:00	4	3	1	1	1	3	2	\N	t
85	Rescate En El Barrio Chino	2401283440-K	2024-10-23 00:00:00	8741-2024	2024-10-24 00:00:00	58	\N	\N	Otra Victima Weibin Ye Rut N° 21.335.055-2	 2024-10-37412	t	f	-30.022499, -71.256133	t	t	f	2024-10-22 23:16:00	\N	4	4	1	2	4	1	\N	t
91	Los Chinos (Arista Los  Primos)	2401056625-4	2023-12-02 00:00:00	\N	\N	\N	\N	\N	\N	S/N	t	f	\N	f	f	f	\N	\N	1	4	6	7	1	11	\N	t
\.


--
-- TOC entry 5163 (class 0 OID 17767)
-- Dependencies: 271
-- Data for Name: CausasCrimenOrganizado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CausasCrimenOrganizado" ("causaId", "parametroId", estado) FROM stdin;
4	1	t
4	2	f
1	3	t
\.


--
-- TOC entry 5119 (class 0 OID 16431)
-- Dependencies: 227
-- Data for Name: CausasImputados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CausasImputados" ("causaId", "imputadoId", "cautelarId", "fechaFormalizacion", formalizado, esimputado, "essujetoInteres", plazo) FROM stdin;
32	1	\N	2024-05-01 00:00:00	t	f	f	60
21	2	\N	2024-03-29 00:00:00	t	f	f	30
21	3	1	2024-03-30 00:00:00	t	t	f	90
1	4	1	2023-12-06 00:00:00	t	t	f	120
61	53	\N	\N	f	t	f	0
2	31	1	2024-08-02 00:00:00	t	t	f	120
2	51	\N	\N	f	f	t	0
12	22	5	\N	f	t	f	0
13	21	1	2024-06-27 00:00:00	t	t	f	100
13	23	3	2024-06-27 00:00:00	t	t	f	100
17	20	1	2024-03-15 00:00:00	t	t	f	150
22	19	2	2024-04-04 00:00:00	t	t	f	90
24	40	1	2024-04-07 00:00:00	t	t	f	90
27	16	\N	\N	f	f	t	0
27	17	\N	\N	f	f	t	0
28	15	\N	2024-10-29 00:00:00	t	t	f	90
31	13	6	\N	t	t	f	120
31	14	6	\N	t	t	f	120
34	12	1	2024-09-08 00:00:00	t	t	f	120
35	11	\N	\N	f	f	t	0
36	10	1	2024-06-04 00:00:00	t	t	f	120
37	8	1	2024-06-06 00:00:00	t	t	f	90
37	9	\N	\N	f	f	t	0
35	55	\N	\N	f	f	t	0
39	7	1	2024-06-19 00:00:00	t	t	f	120
40	30	\N	\N	f	f	t	0
42	41	1	2024-08-02 00:00:00	t	t	f	90
43	35	1	2024-01-03 00:00:00	t	t	f	90
44	36	1	2024-02-03 00:00:00	t	t	f	90
45	29	\N	\N	f	f	t	0
46	28	1	2024-07-04 00:00:00	t	t	f	180
49	32	1	2024-07-13 00:00:00	t	t	f	120
49	33	1	2024-07-13 00:00:00	t	t	f	120
53	38	1	2024-07-29 00:00:00	t	t	f	50
53	39	1	2024-07-29 00:00:00	t	t	f	50
54	42	1	2024-08-08 00:00:00	t	t	f	160
54	43	1	2024-08-08 00:00:00	t	t	f	160
54	56	\N	2024-08-08 00:00:00	t	t	f	160
65	44	\N	\N	f	f	t	0
66	45	1	2024-08-31 00:00:00	t	t	f	100
72	46	\N	\N	f	f	t	0
76	37	1	2024-10-04 00:00:00	t	t	f	0
82	47	\N	\N	f	f	t	0
85	48	1	2024-10-23 00:00:00	t	t	f	120
96	49	2	2024-10-17 00:00:00	t	t	f	60
97	50	1	2024-10-30 00:00:00	t	t	f	90
100	57	1	2024-11-26 00:00:00	t	t	f	120
102	66	1	2024-12-11 00:00:00	t	t	f	90
102	67	\N	\N	f	f	t	0
54	70	1	2024-12-19 00:00:00	t	t	f	90
86	60	\N	\N	f	t	f	0
86	71	\N	\N	f	t	f	0
86	72	\N	\N	f	t	f	0
86	58	\N	\N	f	t	f	0
86	59	\N	\N	f	t	f	0
86	73	\N	\N	f	t	f	0
86	74	\N	\N	f	t	f	0
86	75	\N	\N	f	t	f	0
86	76	\N	\N	f	t	f	0
86	77	\N	\N	f	t	f	0
86	78	\N	\N	f	f	t	0
86	79	\N	\N	f	t	f	0
86	80	\N	\N	f	t	f	0
86	81	\N	\N	f	t	f	0
86	82	\N	\N	f	t	f	0
86	83	1	\N	t	t	f	0
86	84	1	\N	t	t	f	0
86	85	1	\N	t	t	f	0
86	86	1	\N	t	t	f	0
86	87	1	\N	t	t	f	0
86	88	1	\N	t	t	f	0
86	89	1	\N	t	t	f	0
86	90	1	\N	t	t	f	0
103	68	3	2024-12-26 00:00:00	t	t	f	90
103	69	1	2024-12-26 00:00:00	t	t	f	90
108	91	\N	\N	f	f	t	0
115	92	\N	\N	f	t	f	0
117	93	6	\N	t	t	f	0
108	94	\N	\N	f	f	t	0
14	100	1	2025-01-01 00:00:00	t	t	f	80
26	101	\N	\N	f	f	t	0
34	102	6	\N	t	t	f	0
14	54	1	2025-01-06 00:00:00	t	t	f	80
3	6	4	2025-01-08 03:00:00	t	t	f	24
\.


--
-- TOC entry 5120 (class 0 OID 16437)
-- Dependencies: 228
-- Data for Name: CausasRelacionadas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CausasRelacionadas" (id, "causaMadreId", "causaAristaId", "fechaRelacion", observacion, "tipoRelacion") FROM stdin;
6	4	105	2024-12-20 19:19:53.646	Investigación por posible delito de tráfico de droga sy tenencia ilegal de armas de fuego por sujetos que mantienen domicilio en quberada de benavente.\n\n	\N
7	77	78	2024-12-20 19:23:34.78	RIT 1936-2024. JG de Ovalle “La Bendición”, Fiscal FS ECOH 3, Robo con violencia, porte de partes o piezas de arma de fuego, receptación, porte de municiones. Judicializada, formalizada imputado en PP, plazo vigente.	\N
8	8	93	2024-12-20 20:39:44.721	RIT 9061-2024 JG La Serena “Caso sultán arista lavado de activos” ECOH3 Judicializada, no formalizada, reservada	\N
9	8	94	2024-12-20 20:40:37.626	NarcoFuneral Pareja hijo	\N
10	8	92	2024-12-20 20:40:55.824	Atentado a Sasha Mendieta	\N
11	54	107	2024-12-20 20:43:37.554	POR FEMICIDIO JAMIE ALFARO HERRERA ECOH-SACFI IV REGION COQUIMBO  \t	\N
12	40	109	2024-12-30 19:37:16.169	Amenzasas en contra de la testigo	\N
13	40	88	2024-12-30 19:37:46.231	Causa por porte de arma de fuego	\N
\.


--
-- TOC entry 5122 (class 0 OID 16445)
-- Dependencies: 230
-- Data for Name: CausasVictimas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CausasVictimas" ("causaId", "victimaId") FROM stdin;
\.


--
-- TOC entry 5123 (class 0 OID 16448)
-- Dependencies: 231
-- Data for Name: Cautelar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cautelar" (id, nombre) FROM stdin;
1	Prisión preventiva
2	Internación provisoria
3	Privación de libertad domiciliaria
4	Solicitud de extradición\n
5	Otras
6	Orden de Detención
\.


--
-- TOC entry 5125 (class 0 OID 16454)
-- Dependencies: 233
-- Data for Name: Comuna; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comuna" (id, nombre) FROM stdin;
1	Andacollo
2	Canela
3	Combarbalá
4	Coquimbo
5	Illapel
6	La Higuera
7	La Serena
8	Los Vilos
9	Monte Patria
10	Ovalle
11	Paihuano
12	Punitaqui
13	Río Hurtado
14	Salamanca
15	Vicuña
\.


--
-- TOC entry 5162 (class 0 OID 17760)
-- Dependencies: 270
-- Data for Name: CrimenOrganizadoParams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CrimenOrganizadoParams" (value, label, descripcion) FROM stdin;
1	Estructura y Jerarquia	Existencia de roles definidos y niveles jerarquicos dentro del grupo\nSistema de toma de decisiones y cadena de mando identificable\nDivision especializada de tareas y funciones entre miembros
2	Permanencia Temporal	Duracion sostenida de la actividad criminal\nContinuidad operativa mas alla de un solo acto delictivo\nPatrones recurrentes de actividad
3	Alcance y Complejidad	Extension geografica de las operaciones\nDiversificacion de actividades delictivas\nCapacidad logistica y recursos empleados\nUso de tecnologia y metodos sofisticados
4	Aspectos Economicos	Volumen de las ganancias ilicitas\nMecanismos de lavado de dinero\nInversiones en negocios legitimos como fachada\nControl de mercados o territorios
5	Relaciones y Conexiones	Vinculos con otros grupos criminales\nConexiones con funcionarios publicos o autoridades\nRedes de proteccion o complicidad\nInfiltracion en estructuras legales o empresariales
6	Metodos de Control	Uso sistematico de violencia o amenazas\nSistemas de disciplina interna\nMecanismos de proteccion contra infiltracion\nControl territorial o sectorial
7	Capacidad de Adaptacion	Habilidad para modificar operaciones segun presion policial\nRenovacion de miembros y roles\nDiversificacion de metodos y rutas
8	Impacto Social	Afectacion a la seguridad publica\nInfluencia en la comunidad local\nCapacidad de corrupcion institucional
\.


--
-- TOC entry 5127 (class 0 OID 16460)
-- Dependencies: 235
-- Data for Name: Delito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Delito" (id, nombre) FROM stdin;
1	Homicidio
2	Secuestro
3	Lesiones Graves
4	Hallazgo de Cadaver\n
5	Parricidio
6	Varios Delitos
7	No Definido
\.


--
-- TOC entry 5129 (class 0 OID 16466)
-- Dependencies: 237
-- Data for Name: Fiscal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Fiscal" (id, nombre) FROM stdin;
1	Eduardo Yañez Muñoz
2	Carlos Vidal Mercado
3	Freddy Salinas Salinas
4	Nicolás Nicoreanu Rodrigo
5	Ricardo Soto Molina
6	Andrés Villalobos Squella
7	Herbert Rodhe
8	Juan Pablo Torrejón  Silva
9	Rocío Valdivia Delgado
10	Rodrigo Gomez del Pino
\.


--
-- TOC entry 5131 (class 0 OID 16472)
-- Dependencies: 239
-- Data for Name: Foco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Foco" (id, nombre) FROM stdin;
1	ECOH Elqui
2	ECOH Limarí/Choapa
3	Calles Peligrosas
4	PANTAN
5	Diamante Verde
6	No Aplica
7	No definido
\.


--
-- TOC entry 5133 (class 0 OID 16478)
-- Dependencies: 241
-- Data for Name: Fotografia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Fotografia" (id, url, filename, "esPrincipal", "createdAt", "updatedAt", "imputadoId") FROM stdin;
12	/uploads/60dc4282-a04b-4f53-8e8d-011fb6194eeb.jpg	Matias_Contreras.jpg	t	2024-12-18 15:05:10.799	2024-12-18 15:05:10.799	68
13	/uploads/c2b902ff-4b3d-4888-8f81-a1105b03a32d.jpg	brandon cortes.jpg	t	2024-12-18 15:09:25.114	2024-12-18 15:09:25.114	69
14	/uploads/c1654352-13cf-4820-96bd-470379dd50ad.JPG	GABRIEL PEREZ ARANDA 18986492-2.JPG	t	2024-12-19 20:35:35.555	2024-12-19 20:35:35.555	60
15	/uploads/81fc78c7-ef92-48c4-a3a2-44f6279e9302.jpg	Ricardo Guzman Rojas Araya 14.429.167-0.jpg	t	2024-12-19 20:36:54.5	2024-12-19 20:36:54.5	71
16	/uploads/7244658f-d843-4e3f-b931-b54ad9191b39.JPG	MATIAS RAUL ROJAS ARANDA.JPG	t	2024-12-19 20:37:37.148	2024-12-19 20:37:37.148	72
17	/uploads/52b58287-93c3-4593-a835-d04a82efa785.jpg	johan Ariel perez guerra.jpg	t	2024-12-19 20:38:27.197	2024-12-19 20:38:27.197	58
18	/uploads/15721779-cc66-40a4-b4c9-fc3334f2cb41.JPG	JUAN PIZARRRO PIZARRO 13.360.306-9.JPG	t	2024-12-19 20:38:45.606	2024-12-19 20:38:45.606	59
19	/uploads/2312ad6a-27fb-4164-9700-cf55f82e93e2.JPG	JAVIERA ESTEFANIA MARCELA ALFARO ANDRADE 20091133-4.JPG	t	2024-12-19 20:39:40.417	2024-12-19 20:39:40.417	73
20	/uploads/6a717dd0-8ad3-474d-ba0f-31401c20cb48.JPG	PATRICIA JACQUELINE ARANDA GALLEGUILLOS 15044133-1.JPG	t	2024-12-19 20:40:41.588	2024-12-19 20:40:41.588	74
21	/uploads/1600339b-69c6-4bc5-92b0-28f7a0ce179b.JPG	MARINA ISABEL ARANDA GALLEGUILLOS 12098280-K.JPG	t	2024-12-19 20:41:13.569	2024-12-19 20:41:13.569	75
22	/uploads/bde3bde3-d221-4137-b765-1abf991ab10b.jpg	PEDRO ABEL ARANDA GALLEGUILLOS.jpg	t	2024-12-19 20:41:45.153	2024-12-19 20:41:45.153	76
23	/uploads/1a28dd56-8027-45b9-b28f-236bf98fcfbe.jpg	12098285-0.jpg	t	2024-12-19 20:42:51.179	2024-12-19 20:42:51.179	77
24	/uploads/40e5352a-2b8a-429e-84a4-0e6aafd3edf8.jpg	nelson pizarro pizarro.jpg	t	2024-12-19 20:43:32.273	2024-12-19 20:43:32.273	78
25	/uploads/183f3a3e-7801-46c8-8f15-e7fdeaee9a9a.JPG	CECILIA SOLEDAD PIZARRO PIZARRO.JPG	t	2024-12-19 20:45:09.083	2024-12-19 20:45:09.083	79
26	/uploads/21a3073a-4cc2-4eb8-815e-ba98d81f2d64.JPG	MERCEDES LUISA PIZARRO PIZARRO.JPG	t	2024-12-19 20:45:57.1	2024-12-19 20:45:57.1	80
27	/uploads/52c6a248-15cc-46ca-bf98-b49fcdcea75f.jpg	tyare muñoz aranda 20.092.441-K.jpg	t	2024-12-19 20:46:29.197	2024-12-19 20:46:29.197	81
28	/uploads/927458e7-ba69-45f2-ac46-2c6034e16428.jpg	diana muñoz aranda 19.944.832-3.jpg	t	2024-12-19 20:47:03.302	2024-12-19 20:47:03.302	82
29	/uploads/68507759-ebdb-4de5-88f0-23da2b088a77.jpg	freddy antonio zepeda gomez.jpg	t	2024-12-19 20:47:45.255	2024-12-19 20:47:45.255	83
30	/uploads/eee73f48-e608-41c0-b782-7b2f3551fad9.JPG	ALVARO ZEPEDA GOMEZ.JPG	t	2024-12-19 20:49:03.271	2024-12-19 20:49:03.271	84
31	/uploads/b18957d7-5649-4c87-a05e-725c15b0a455.JPG	SANDRA CAROLINA GOMEZ ALFARO.JPG	t	2024-12-19 20:49:51.027	2024-12-19 20:49:51.027	85
32	/uploads/823a84ae-c4c9-4cb1-8279-79c5471b82b6.JPG	RAQUE ROJAZ DIAZ.JPG	t	2024-12-19 20:50:50.844	2024-12-19 20:50:50.844	86
34	/uploads/6a9e7743-dca6-4a4d-ba38-836d43e38a68.jpg	diego 20193475-3.jpg	t	2024-12-19 20:53:19.264	2024-12-19 20:53:19.264	87
35	/uploads/0eafec75-a783-44c3-a028-b1af5b584625.jpg	CRIST CRISTOPHER BALCAZAR JOFRE 17656092-4.jpg	t	2024-12-19 20:54:40.997	2024-12-19 20:54:40.997	88
36	/uploads/f4fe0833-0bd9-4871-a506-d6edd778af5e.jpg	ivan gonzalez 18986172-9.jpg	t	2024-12-19 20:56:01.833	2024-12-19 20:56:01.833	89
37	/uploads/7062973b-9cae-4546-b9f6-99ad5b2513f9.jpg	luis alfonso espindola.jpg	t	2024-12-19 20:57:13.445	2024-12-19 20:57:13.445	90
38	/uploads/9fdd60bc-adfd-4592-8d3b-834d18215ab9.jpg	pasten navea.jpg	t	2024-12-24 13:14:53.294	2024-12-24 13:14:53.294	4
39	/uploads/77af5695-7b09-44c9-97d4-6a86eb309276.jpg	enzo.jpg	t	2024-12-30 14:57:23.952	2024-12-30 14:57:23.952	91
40	/uploads/6f7e3ece-2642-49b3-bb09-0f3b6a6ed64e.jpg	aladino.jpg	t	2024-12-31 14:41:02.251	2024-12-31 14:41:02.251	92
41	/uploads/653370a0-6215-4f98-8cd7-0326d3ba0a40.jpg	dilan.jpg	t	2024-12-31 14:58:26.774	2024-12-31 14:58:26.774	93
42	/uploads/63b09e14-92a2-4ea5-8dd8-010177669ac9.jpg	daniel salfate.jpg	t	2024-12-31 16:25:01.522	2024-12-31 16:25:01.522	94
43	/uploads/4029dcc9-fdc8-4266-8545-f5d1be9d3a52.jpg	elpita.jpg	t	2025-01-01 14:43:46.315	2025-01-01 14:43:46.315	95
44	/uploads/59887fbd-c423-42d8-9b59-79449f459e19.jpg	otro.jpg	t	2025-01-01 14:44:03.835	2025-01-01 14:44:03.835	96
45	/uploads/b95e7c1d-8c25-4cf9-af09-60aba35a0c44.jpg	carlos gonzalez.jpg	t	2025-01-01 14:46:23.36	2025-01-01 14:46:23.36	97
46	/uploads/c3c07ab7-1972-4385-8aaf-9a896a7f0a5a.jpg	diego rojas.jpg	t	2025-01-01 14:50:12.752	2025-01-01 14:50:12.752	98
47	/uploads/0669d9de-d905-45f0-ad14-473edc0df1bd.JPG	FRANCO ALEJANDRO.JPG	t	2025-01-01 15:02:26.027	2025-01-01 15:02:26.027	99
48	/uploads/e4d5a276-106a-4928-a50b-8456f63662d2.jpg	Paul Michea.jpg	t	2025-01-02 14:13:16.848	2025-01-02 14:13:16.848	100
49	/uploads/a3a98be3-b17c-480e-9432-09dc0ef052c8.jpg	46492248_106166727074355_5951916243723223040_n.jpg	f	2025-01-02 14:13:52.783	2025-01-02 14:13:52.783	100
50	/uploads/99be6576-a159-4aaa-9cea-d1dfa7edce00.jpg	46511246_112512369773124_2292956174590410752_n.jpg	f	2025-01-02 14:13:55.861	2025-01-02 14:13:55.861	100
51	/uploads/a3e80ee3-f3d6-49be-8057-b6690e3b6fef.JPG	21118618-6.JPG	t	2025-01-02 19:04:37.736	2025-01-02 19:04:37.736	101
52	/uploads/e8a7cfa6-459a-4c43-906f-2f5c95e5f223.jpg	20840292-7.jpg	t	2025-01-02 20:19:07.75	2025-01-02 20:19:07.75	102
53	/uploads/8fb20231-6d36-4675-bf75-6d18875c6333.JPG	JAVIER ISIDRO MARQUEZ.JPG	t	2025-01-03 13:53:49.29	2025-01-03 13:53:49.29	50
54	/uploads/e2083759-5793-4bb3-8685-19ee8f29a5c6.jpg	lucas.jpg	t	2025-01-06 19:24:19.645	2025-01-06 19:24:19.645	54
55	/uploads/af8f4989-f283-445f-aa6e-490603515ce7.jpg	2fa159ad-1fa9-4a17-9b92-9584f3578f58.jpg	f	2025-01-06 19:26:04.493	2025-01-06 19:26:04.493	54
56	/uploads/407c85d7-2c38-4207-94fa-fbe5dfebfd73.jpg	3e273f36-482a-4c24-8da1-860a50a5b788.jpg	f	2025-01-06 19:26:04.54	2025-01-06 19:26:04.54	54
57	/uploads/3a0cbf9f-6fec-44ac-a9fa-f15628455b7e.jpg	9b5794f6-80cc-452a-b6fd-c26e0c67cd3d.jpg	f	2025-01-06 19:26:04.588	2025-01-06 19:26:04.588	54
\.


--
-- TOC entry 5135 (class 0 OID 16486)
-- Dependencies: 243
-- Data for Name: Imputado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Imputado" (id, "nombreSujeto", "docId", "nacionalidadId", "createdAt", "updatedAt", "fotoPrincipal", alias, caracterisiticas) FROM stdin;
5	Santiago Uribe Perez	25310804-5	45	2024-11-19 17:32:50.451	\N	\N	\N	\N
6	Francisco Javier Rodriguez Rodriguez	14891494-K	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
7	Daniel Eduardo Lueiza Gonzalez	11524518-K	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
8	Mariangela Del Carmen González Carrasco	14953471-7	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
9	Luis Alejandro Rojas Gonzalez	20446001	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
10	Alvaro Alejandro Castillo Araya\t	18353552-8	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
11	Johany Andres Lopetegui Godoy\t	13177361-7	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
12	Francisco Javier Rojas Bustamante	19569013-8	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
13	Marlon Stick Duke Garzon	1021667965	45	2024-11-19 17:32:50.451	\N	\N	\N	\N
14	Blas De Jesus Rivera Contreras	1031164662	45	2024-11-19 17:32:50.451	\N	\N	\N	\N
15	Miguel Antonio Montes Chaparro	20004863	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
16	Esteban Aaron Herrera Moreno	19443143-0	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
17	Fernando Alexis Santana Barrientos	15781675-6	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
18	Dilan Scot Valdez Ramirez	23367365-K	45	2024-11-19 17:32:50.451	\N	\N	\N	\N
19	Luis Matias Pizarro Veliz	22198613-K\t	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
20	Jhonathan Eloy Sanders Araya	17453099-8	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
21	Juan Fernando Romero Quintero	20864388-6	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
22	Jesus Alveiro Santander Moreno	26311914	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
23	Matias Isaac Romero Quintero	21738426-5	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
24	Kevin Eduardo Meneses Mundaca	19040639-3	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
25	Clara Andrea Quintero Lopez	13649208-K	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
26	Jorge Manuel Torres Varas	10219221-4	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
27	Veronica Lorena Garcia Zepeda	11347015-1	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
28	Francisco Javier Novoa Ibaceta	15897993-4	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
29	Luis Ignacio Cerda Vega	18889439-9	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
30	Yamir Alexander Yosue Rojas Antiquera	20407328-7	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
31	Jonathan Ivan Carvajal Milla	15968487-3	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
32	Crysthofer Tomas Arraiz Lopez	28484957-4	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
33	Omar Arriaza Herrera	11111111-1	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
34	Mariangela Del Carmen Gonzalez Carrasco	21042678	240	2024-11-19 17:32:50.451	\N	\N	\N	\N
35	Jose Cleonorbo Cuesta Martinez 	24682718-4 	45	2024-11-19 17:32:50.451	\N	\N	\N	\N
36	Carlos Matias Alfaro Castillo	17711149-K	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
37	Alejandro Manuel Herrera Vargas	18968097-K	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
38	Jimmy Angel Gallardo Villanueva	16053564-4	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
39	Cristopher Henry Vega Villanueva	15673287-7 	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
40	Carla Belen Olivares Miranda	17486166-8	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
41	Felix Alberto Montiilla Galue	14893396-0	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
42	Maximiliano Jose Castex Ortiz	19769946-9	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
43	Francisco Javier Zurita Camacho	16864221-0	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
44	Hector Cortes Ferreira	17451985-4	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
45	Nicolas Alejandro Araya Guerrero	19041978-9	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
46	Marcelo Jesús Vera Huilcaleo,	20110545-5	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
47	Boris Yordans Carrasco Veliz	19770060-2	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
48	Brian Anthonie Lopetegui Vicuña	20127204-1	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
49	Matías Felipe Astudillo Villalobos	23084584-0	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
51	Bruno Raul Ignadio Aguilera Collao	21981387-2	41	2024-11-19 17:32:50.451	\N	\N	\N	\N
1	Gabriel Maximiliano Maturana Aracena	23304933-6	41	2024-11-19 17:32:50.451	2024-11-22 01:45:53.666	/uploads/12847081-4895-43a5-a0e2-16c9dc25c7c2_Imagen1.jpg	\N	\N
2	Luis Francisco Beltre Rondon	26545641-3	188	2024-11-19 17:32:50.451	2024-11-24 03:14:35.672	/uploads/ae6a05d6-0bf7-4ac2-9e1f-66e3451c0fdb.jpg	\N	\N
3	Emmanel Alejandro  Uceta	26962245-8	188	2024-11-19 17:32:50.451	2024-11-24 13:58:09.196	/uploads/29a5f0fa-1f38-42a5-b3fe-aa443db26b5b.jpg	\N	\N
53	GIAN FRANCO STELLON BONCHELLI	20183725-1	41	2024-12-02 19:56:13.029	2024-12-02 19:56:13.029	\N	\N	\N
55	FERNANDO ANDRES VALDES LY	10958068-6	41	2024-12-03 20:41:50.661	2024-12-03 20:41:50.661	\N	\N	\N
56	FRANCISCO JESUS FLORES SANTIBAÑEZ	15820788-5	41	2024-12-03 21:00:10.314	2024-12-03 21:00:10.314	\N	\N	\N
57	JUAN ENRIQUE CASTRO BERGER	18010853-K	41	2024-12-03 21:13:28.71	2024-12-03 21:13:28.71	\N	\N	\N
61	CLAUDIO ALEXANDER FORNES VICUÑA	17804740-K	41	2024-12-03 21:41:47.118	2024-12-03 21:41:47.118	\N	\N	\N
62	BRAYAN ANTONIO PIZARRO ESPINOZA	18914447-4	41	2024-12-03 21:42:13.585	2024-12-03 21:42:13.585	\N	\N	\N
63	BENJAMÍN IGNACIO BARRÍA MUJICA	21281741-4	41	2024-12-03 21:42:34.177	2024-12-03 21:42:34.177	\N	\N	\N
64	BRAYAN ANTONIO PIZARRO ESPINOZA	18914447-4	41	2024-12-03 21:42:52.871	2024-12-03 21:42:52.871	\N	\N	\N
65	DARWIN ALEJANDRO JACOBS RIQUELME	17159997-0	41	2024-12-03 21:43:20.52	2024-12-03 21:43:20.52	\N	\N	\N
66	ALEXIS ANTONIO SIERRA CASTRILLON	24730246-8	45	2024-12-11 20:39:07.182	2024-12-11 20:45:53.882	/uploads/28513cb1-68bf-4e65-9950-c498e5f33f81.jpg	\N	\N
67	JORFAN JOSE RUIZ SANCHEZ	26742528-0	188	2024-12-12 00:48:55.227	2024-12-12 00:49:15.17	/uploads/c2ee9980-5b28-4bb5-99e0-454e2e183a2e.jpg	\N	\N
68	MATHIAS GIOVANNI CONTRERAS D'ARCANGELI	21307864-K	41	2024-12-18 15:02:00.163	2024-12-18 15:05:10.802	/uploads/60dc4282-a04b-4f53-8e8d-011fb6194eeb.jpg	\N	\N
71	RICARDO GUZMAN ROJAS ARAYA	14429167-0	41	2024-12-19 20:36:45.822	2024-12-19 20:36:54.502	/uploads/81fc78c7-ef92-48c4-a3a2-44f6279e9302.jpg	\N	\N
69	BRANDON ROBERTO CORTÉS CORTÉS	21158287-1	41	2024-12-18 15:07:34.084	2024-12-18 15:09:25.117	/uploads/c2b902ff-4b3d-4888-8f81-a1105b03a32d.jpg	\N	\N
60	DARIO PEREZ GABRIELARANDA	18986492-2	41	2024-12-03 21:40:26.098	2024-12-19 20:35:35.558	/uploads/c1654352-13cf-4820-96bd-470379dd50ad.JPG	\N	\N
72	MATIAS RAUL ROJAS ARANDA	20797270-3	41	2024-12-19 20:37:20.399	2024-12-19 20:37:37.149	/uploads/7244658f-d843-4e3f-b931-b54ad9191b39.JPG	\N	\N
58	JOHAN ARIEL PEREZ GUERRA	15923594-7	41	2024-12-03 21:39:43.974	2024-12-19 20:38:27.199	/uploads/52b58287-93c3-4593-a835-d04a82efa785.jpg	\N	\N
59	JUAN ADAN PIZARRO PIZARRO	13360306-9	41	2024-12-03 21:40:05.304	2024-12-19 20:38:45.607	/uploads/15721779-cc66-40a4-b4c9-fc3334f2cb41.JPG	\N	\N
73	JAVIERA ESTEPHANIA ALDARO ANDRADE	20091133-4	41	2024-12-19 20:39:26.21	2024-12-19 20:39:40.418	/uploads/2312ad6a-27fb-4164-9700-cf55f82e93e2.JPG	\N	\N
74	PATRICIA JACQUELINE ARANDA GALLEGUILLOS	15044133-1	41	2024-12-19 20:40:31.057	2024-12-19 20:40:41.59	/uploads/6a717dd0-8ad3-474d-ba0f-31401c20cb48.JPG	\N	\N
75	MARINA ISABEL ARANDA GALLEGUILLOS	12098280-K	41	2024-12-19 20:41:06.781	2024-12-19 20:41:13.57	/uploads/1600339b-69c6-4bc5-92b0-28f7a0ce179b.JPG	\N	\N
76	PEDRO ABEL ARANDA GALLEGUILLOS	10144145-8	41	2024-12-19 20:41:34.866	2024-12-19 20:41:45.155	/uploads/bde3bde3-d221-4137-b765-1abf991ab10b.jpg	\N	\N
77	JUAN CARLOS ARANDA GALLEGUILLOS	12098285-0	41	2024-12-19 20:42:12.535	2024-12-19 20:42:51.181	/uploads/1a28dd56-8027-45b9-b28f-236bf98fcfbe.jpg	\N	\N
50	Javier Isidro Marquez Ardiles	9525734-8	41	2024-11-19 17:32:50.451	2025-01-03 13:53:49.301	/uploads/8fb20231-6d36-4675-bf75-6d18875c6333.JPG	\N	\N
70	Jorge Gonzalez Oyanadel	18757406-4	41	2024-12-19 20:23:25.131	2024-12-26 18:15:41.076	\N	El Colate	\N
78	NELSON ENRIQUE PIZARRO PIZARRO	15571682-7	41	2024-12-19 20:43:23.014	2024-12-19 20:43:32.274	/uploads/40e5352a-2b8a-429e-84a4-0e6aafd3edf8.jpg	\N	\N
79	CECILIA SOLEDAD PIZARRO PIZARRO	13976672-5	41	2024-12-19 20:45:00.514	2024-12-19 20:45:09.085	/uploads/183f3a3e-7801-46c8-8f15-e7fdeaee9a9a.JPG	\N	\N
80	MERCEDES LUISA PIZARRO PIZARRO	13181579-4	41	2024-12-19 20:45:43.841	2024-12-19 20:45:57.101	/uploads/21a3073a-4cc2-4eb8-815e-ba98d81f2d64.JPG	\N	\N
81	TYARE IGNACIA MUÑOZ GALLEGUILLOS	20092441-K	41	2024-12-19 20:46:22.101	2024-12-19 20:46:29.198	/uploads/52c6a248-15cc-46ca-bf98-b49fcdcea75f.jpg	\N	\N
82	DIANA FRANCISCA MUÑOZ ARANDA	19944832-3	41	2024-12-19 20:46:50.337	2024-12-19 20:47:03.303	/uploads/927458e7-ba69-45f2-ac46-2c6034e16428.jpg	\N	\N
83	FREDDY ANTONIO ZEPEDA GOMEZ	13330092-9	41	2024-12-19 20:47:35.181	2024-12-19 20:47:45.256	/uploads/68507759-ebdb-4de5-88f0-23da2b088a77.jpg	\N	\N
84	ALVARO IGNACIO ZEPEDA GOMEZ	20310170-8	41	2024-12-19 20:48:45.905	2024-12-19 20:49:03.272	/uploads/eee73f48-e608-41c0-b782-7b2f3551fad9.JPG	\N	\N
85	SANDRA CAROLINA GOMEZ ALFARO	15573364-0	41	2024-12-19 20:49:39.476	2024-12-19 20:49:51.028	/uploads/b18957d7-5649-4c87-a05e-725c15b0a455.JPG	\N	\N
86	RAQUEL YAMILET  ROJAS DIAZ	13536417-7	41	2024-12-19 20:50:36.07	2024-12-19 20:50:50.845	/uploads/823a84ae-c4c9-4cb1-8279-79c5471b82b6.JPG	\N	\N
87	DIEGO ARMANDO CUEVAS SALAZAR	20193475-3	41	2024-12-19 20:51:30.512	2024-12-19 20:53:19.266	/uploads/6a9e7743-dca6-4a4d-ba38-836d43e38a68.jpg	\N	\N
88	CRIST CRISTOPHER BALCAZAR JOFRE	17656092-4	41	2024-12-19 20:53:48.654	2024-12-19 20:54:41	/uploads/0eafec75-a783-44c3-a028-b1af5b584625.jpg	\N	\N
89	IVAN DANIEL GONZALEZ CORTES	18986172-9	41	2024-12-19 20:55:09.508	2024-12-19 20:56:01.834	/uploads/f4fe0833-0bd9-4871-a506-d6edd778af5e.jpg	\N	\N
90	LUIS ALFONSO ESPINOLA JULIO 	20308946-5	41	2024-12-19 20:56:29.336	2024-12-19 20:57:13.446	/uploads/7062973b-9cae-4546-b9f6-99ad5b2513f9.jpg	\N	\N
4	Juan Miguel Pasten Navea	14386098-1	41	2024-11-19 17:32:50.451	2024-12-24 13:14:53.312	/uploads/9fdd60bc-adfd-4592-8d3b-834d18215ab9.jpg	\N	\N
91	ENZO EMILIANO  CORTÉS ALFRED	19154719-5	41	2024-12-30 14:55:48.054	2024-12-30 14:57:23.954	/uploads/77af5695-7b09-44c9-97d4-6a86eb309276.jpg	\N	\N
92	ALADINO JOEL TORO CONTRERAS	15732015-7	41	2024-12-31 14:40:53.798	2024-12-31 14:41:02.253	/uploads/6f7e3ece-2642-49b3-bb09-0f3b6a6ed64e.jpg	\N	\N
93	DYLAN YHUSEPH COVARRUBIAS MARTINEZ\t	22175790-4	41	2024-12-31 14:56:25.419	2024-12-31 14:58:26.777	/uploads/653370a0-6215-4f98-8cd7-0326d3ba0a40.jpg	\N	\N
94	DANIEL ANDRÉS SALFATE ARAYA	20006076-8	41	2024-12-31 16:13:33.49	2024-12-31 16:30:30.535	/uploads/63b09e14-92a2-4ea5-8dd8-010177669ac9.jpg	salfa	\N
95	CLAUDIO EDUARDO BRAVO VIGORENA	17409877-8	41	2025-01-01 14:39:46.548	2025-01-01 14:43:46.316	/uploads/4029dcc9-fdc8-4266-8545-f5d1be9d3a52.jpg	\N	\N
96	CRISTIAN CAMILO CORTES LARA	18477943-9	41	2025-01-01 14:41:16.691	2025-01-01 14:44:03.836	/uploads/59887fbd-c423-42d8-9b59-79449f459e19.jpg	\N	\N
97	CARLOS ALBERTO GONZÁLEZ PIZARRO	16527199-8	41	2025-01-01 14:46:12.899	2025-01-01 14:46:23.361	/uploads/b95e7c1d-8c25-4cf9-af09-60aba35a0c44.jpg	\N	\N
98	DIEGO ANDRÉS ROJAS PIZARRO	17827720-0	41	2025-01-01 14:49:39.496	2025-01-01 14:50:12.754	/uploads/c3c07ab7-1972-4385-8aaf-9a896a7f0a5a.jpg	\N	\N
99	FRANCO ALEJANDRO BRAVO VIGORENA	15037750-1	41	2025-01-01 15:01:46.996	2025-01-01 15:02:26.028	/uploads/0669d9de-d905-45f0-ad14-473edc0df1bd.JPG	\N	\N
100	PAUL WILLIAMS MICHEA LARA	19944700-9	41	2025-01-02 14:10:11.637	2025-01-02 14:13:16.85	/uploads/e4d5a276-106a-4928-a50b-8456f63662d2.jpg	\N	\N
101	DAVID NEHEMIAS ARAVENA OLIVAREZ	21118618-6	41	2025-01-02 19:02:27.298	2025-01-02 19:04:37.738	/uploads/a3e80ee3-f3d6-49be-8057-b6690e3b6fef.JPG	\N	\N
102	SEBASTIÁN IGNACIO GODOY VILCHES	20840292-7	41	2025-01-02 20:18:50.213	2025-01-02 20:19:07.752	/uploads/e8a7cfa6-459a-4c43-906f-2f5c95e5f223.jpg	\N	\N
54	LUCAS SIMON PANAYOTOPULO OJEDA	21448240-1	41	2024-12-03 20:17:41.922	2025-01-06 19:24:19.647	/uploads/e2083759-5793-4bb3-8685-19ee8f29a5c6.jpg	\N	\N
\.


--
-- TOC entry 5137 (class 0 OID 16493)
-- Dependencies: 245
-- Data for Name: MiembrosOrganizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MiembrosOrganizacion" (id, "organizacionId", "imputadoId", rol, "fechaIngreso", "fechaSalida", activo, "createdAt", "updatedAt") FROM stdin;
15	4	70	Lider	2024-12-19 00:00:00	\N	t	2024-12-19 20:26:13.961	2024-12-19 20:26:13.961
16	4	56	Colaborador	2024-12-19 00:00:00	\N	t	2024-12-19 20:27:09.283	2024-12-19 20:27:09.283
17	4	42		2024-12-19 00:00:00	\N	t	2024-12-19 20:27:58.033	2024-12-19 20:27:58.033
18	5	65		2024-12-19 00:00:00	\N	t	2024-12-19 20:29:13.945	2024-12-19 20:29:13.945
19	5	63		2024-12-19 00:00:00	\N	t	2024-12-19 20:29:29.565	2024-12-19 20:29:29.565
20	5	61		2024-12-19 00:00:00	\N	t	2024-12-19 20:29:56.661	2024-12-19 20:29:56.661
21	5	62		2024-12-19 00:00:00	\N	t	2024-12-19 20:30:11.79	2024-12-19 20:30:11.79
22	6	58	Lider	2024-12-19 00:00:00	\N	t	2024-12-19 20:31:56.332	2024-12-19 20:31:56.332
23	6	59	Lider	2024-12-19 00:00:00	\N	t	2024-12-19 20:32:10.173	2024-12-19 20:32:10.173
24	6	60		2024-12-19 00:00:00	\N	t	2024-12-19 20:58:38.041	2024-12-19 20:58:38.041
25	6	71		2024-12-19 00:00:00	\N	t	2024-12-19 20:58:45.945	2024-12-19 20:58:45.945
26	6	72		2024-12-19 00:00:00	\N	t	2024-12-19 20:59:07.386	2024-12-19 20:59:07.386
27	6	73		2024-12-19 00:00:00	\N	t	2024-12-19 20:59:40.656	2024-12-19 20:59:40.656
28	6	74		2024-12-19 00:00:00	\N	t	2024-12-19 21:00:28.207	2024-12-19 21:00:28.207
29	6	75		2024-12-19 00:00:00	\N	t	2024-12-19 21:00:49.37	2024-12-19 21:00:49.37
30	6	76		2024-12-19 00:00:00	\N	t	2024-12-19 21:00:58.064	2024-12-19 21:00:58.064
31	6	77		2024-12-19 00:00:00	\N	t	2024-12-19 21:01:16.725	2024-12-19 21:01:16.725
32	6	78		2024-12-19 00:00:00	\N	t	2024-12-19 21:01:36.228	2024-12-19 21:01:36.228
33	6	79		2024-12-19 00:00:00	\N	t	2024-12-19 21:03:02.322	2024-12-19 21:03:02.322
34	6	80		2024-12-19 00:00:00	\N	t	2024-12-19 21:03:14.838	2024-12-19 21:03:14.838
35	6	81		2024-12-19 00:00:00	\N	t	2024-12-19 21:03:28.526	2024-12-19 21:03:28.526
36	6	82		2024-12-19 00:00:00	\N	t	2024-12-19 21:03:39.493	2024-12-19 21:03:39.493
37	6	83		2024-12-19 00:00:00	\N	t	2024-12-19 21:03:50.515	2024-12-19 21:03:50.515
38	6	84		2024-12-19 00:00:00	\N	t	2024-12-19 21:04:03.662	2024-12-19 21:04:03.662
39	6	85		2024-12-19 00:00:00	\N	t	2024-12-19 21:04:26.44	2024-12-19 21:04:26.44
40	6	86		2024-12-19 00:00:00	\N	t	2024-12-19 21:04:36.879	2024-12-19 21:04:36.879
41	6	87		2024-12-19 00:00:00	\N	t	2024-12-19 21:04:45.45	2024-12-19 21:04:45.45
42	6	88		2024-12-19 00:00:00	\N	t	2024-12-19 21:05:04.828	2024-12-19 21:05:04.828
43	6	89		2024-12-19 00:00:00	\N	t	2024-12-19 21:05:13.411	2024-12-19 21:05:13.411
44	6	90		2024-12-19 00:00:00	\N	t	2024-12-19 21:05:24.788	2024-12-19 21:05:24.788
46	7	95	Lidero	2025-01-01 00:00:00	\N	t	2025-01-01 14:42:27.027	2025-01-01 14:42:27.027
47	7	96	Soldado	2025-01-01 00:00:00	\N	t	2025-01-01 14:42:38.391	2025-01-01 14:42:38.391
48	7	97	Soldado	2025-01-01 00:00:00	\N	t	2025-01-01 14:46:43.917	2025-01-01 14:46:43.917
49	7	98	Soldado	2025-01-01 00:00:00	\N	t	2025-01-01 14:49:57.777	2025-01-01 14:49:57.777
50	7	99	Lider	2025-01-01 00:00:00	\N	t	2025-01-01 15:02:50.741	2025-01-01 15:02:50.741
\.


--
-- TOC entry 5139 (class 0 OID 16501)
-- Dependencies: 247
-- Data for Name: Nacionalidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Nacionalidad" (id, nombre) FROM stdin;
1	Afganistán
2	Albania
3	Alemania
4	Algeria
5	Andorra
6	Angola
7	Anguila
8	Antártida
9	Antigua y Barbuda
10	Antillas Neerlandesas
11	Arabia Saudita
12	Argentina
13	Armenia
14	Aruba
15	Australia
16	Austria
17	Azerbayán
18	Bélgica
19	Bahamas
20	Bahrein
21	Bangladesh
22	Barbados
23	Belice
24	Benín
25	Bhután
26	Bielorrusia
27	Birmania
28	Bolivia
29	Bosnia y Herzegovina
30	Botsuana
31	Brasil
32	Brunéi
33	Bulgaria
34	Burkina Faso
35	Burundi
36	Cabo Verde
37	Camboya
38	Camerún
39	Canadá
40	Chad
41	Chile
42	China
43	Chipre
44	Ciudad del Vaticano
45	Colombia
46	Comoras
47	Congo
48	Congo
49	Corea del Norte
50	Corea del Sur
51	Costa de Marfil
52	Costa Rica
53	Croacia
54	Cuba
55	Dinamarca
56	Dominica
57	Ecuador
58	Egipto
59	El Salvador
60	Emiratos Árabes Unidos
61	Eritrea
62	Eslovaquia
63	Eslovenia
64	España
65	Estados Unidos de América
66	Estonia
67	Etiopía
68	Filipinas
69	Finlandia
70	Fiyi
71	Francia
72	Gabón
73	Gambia
74	Georgia
75	Ghana
76	Gibraltar
77	Granada
78	Grecia
79	Groenlandia
80	Guadalupe
81	Guam
82	Guatemala
83	Guayana Francesa
84	Guernsey
85	Guinea
86	Guinea Ecuatorial
87	Guinea-Bissau
88	Guyana
89	Haití
90	Honduras
91	Hong kong
92	Hungría
93	India
94	Indonesia
95	Irán
96	Irak
97	Irlanda
98	Isla Bouvet
99	Isla de Man
100	Isla de Navidad
101	Isla Norfolk
102	Islandia
103	Islas Bermudas
104	Islas Caimán
105	Islas Cocos (Keeling)
106	Islas Cook
107	Islas de Åland
108	Islas Feroe
109	Islas Georgias del Sur y Sandwich del Sur
110	Islas Heard y McDonald
111	Islas Maldivas
112	Islas Malvinas
113	Islas Marianas del Norte
114	Islas Marshall
115	Islas Pitcairn
116	Islas Salomón
117	Islas Turcas y Caicos
118	Islas Ultramarinas Menores de Estados Unidos
119	Islas Vírgenes Británicas
120	Islas Vírgenes de los Estados Unidos
121	Israel
122	Italia
123	Jamaica
124	Japón
125	Jersey
126	Jordania
127	Kazajistán
128	Kenia
129	Kirgizstán
130	Kiribati
131	Kuwait
132	Líbano
133	Laos
134	Lesoto
135	Letonia
136	Liberia
137	Libia
138	Liechtenstein
139	Lituania
140	Luxemburgo
141	México
142	Mónaco
143	Macao
144	Macedônia
145	Madagascar
146	Malasia
147	Malawi
148	Mali
149	Malta
150	Marruecos
151	Martinica
152	Mauricio
153	Mauritania
154	Mayotte
155	Micronesia
156	Moldavia
157	Mongolia
158	Montenegro
159	Montserrat
160	Mozambique
161	Namibia
162	Nauru
163	Nepal
164	Nicaragua
165	Niger
166	Nigeria
167	Niue
168	Noruega
169	Nueva Caledonia
170	Nueva Zelanda
171	Omán
172	Países Bajos
173	Pakistán
174	Palau
175	Palestina
176	Panamá
177	Papúa Nueva Guinea
178	Paraguay
179	Perú
180	Polinesia Francesa
181	Polonia
182	Portugal
183	Puerto Rico
184	Qatar
185	Reino Unido
186	República Centroafricana
187	República Checa
188	República Dominicana
189	Reunión
190	Ruanda
191	Rumanía
192	Rusia
193	Sahara Occidental
194	Samoa
195	Samoa Americana
196	San Bartolomé
197	San Cristóbal y Nieves
198	San Marino
199	San Martín (Francia)
200	San Pedro y Miquelón
201	San Vicente y las Granadinas
202	Santa Elena
203	Santa Lucía
204	Santo Tomé y Príncipe
205	Senegal
206	Serbia
207	Seychelles
208	Sierra Leona
209	Singapur
210	Siria
211	Somalia
212	Sri lanka
213	Sudáfrica
214	Sudán
215	Suecia
216	Suiza
217	Surinám
218	Svalbard y Jan Mayen
219	Swazilandia
220	Tadjikistán
221	Tailandia
222	Taiwán
223	Tanzania
224	Territorio Británico del Océano Índico
225	Territorios Australes y Antárticas Franceses
226	Timor Oriental
227	Togo
228	Tokelau
229	Tonga
230	Trinidad y Tobago
231	Tunez
232	Turkmenistán
233	Turquía
234	Tuvalu
235	Ucrania
236	Uganda
237	Uruguay
238	Uzbekistán
239	Vanuatu
240	Venezuela
241	Vietnam
242	Wallis y Futuna
243	Yemen
244	Yibuti
245	Zambia
246	Zimbabue
\.


--
-- TOC entry 5141 (class 0 OID 16507)
-- Dependencies: 249
-- Data for Name: OrganizacionDelictual; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrganizacionDelictual" (id, nombre, descripcion, "fechaIdentificacion", activa, "tipoOrganizacionId", "createdAt", "updatedAt") FROM stdin;
4	Banda Del Colate	Banda en Coquimbo, relacionada a homicidio de Los Tambores	2024-12-19 00:00:00	t	1	2024-12-19 20:19:07.021	2024-12-19 20:19:07.021
5	PANTAN	Organización proveniente de la V Región. Se concertan para quitada de drogas y dinero a familias de la región de Coquimbo	2024-12-19 00:00:00	t	2	2024-12-19 20:20:26.327	2024-12-19 20:20:26.327
6	DIAMANTE VERDE	Organciación dedicada a venta de semillas y marihuana, Ovalle, alcones.	2024-12-19 00:00:00	t	1	2024-12-19 20:31:32.437	2024-12-19 20:31:32.437
7	Los Pita	Banda Narcotrafico, Viuña, Población Manuel Rodriguez	2025-01-01 00:00:00	t	1	2025-01-01 14:42:10.393	2025-01-01 14:42:10.393
\.


--
-- TOC entry 5143 (class 0 OID 16515)
-- Dependencies: 251
-- Data for Name: TipoActividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TipoActividad" (id, nombre, descripcion, "areaId", activo, "createdAt", "updatedAt") FROM stdin;
1	Georreferenciación trafico telefónico	Georreferenciación trafico telefónico, registros de comunicaciones en antenas de compañías telefónicas	1	t	2024-12-18 10:25:00	2024-12-18 10:25:00
2	Extracción y análisis de evidencia digital	Extracción y análisis de evidencia digital	1	t	2024-12-18 10:25:00	2024-12-18 10:25:00
3	Reporte de Monitoreo	Reporte Monitoreo	1	t	2024-12-18 10:25:00	2024-12-18 10:25:00
4	Proyecto acusación	Proyecto acusación	2	t	2024-12-18 10:25:00	2024-12-18 10:25:00
5	Reporte de análisis	Reporte de análisis	1	t	2024-12-18 10:25:00	2024-12-18 10:25:00
\.


--
-- TOC entry 5145 (class 0 OID 16523)
-- Dependencies: 253
-- Data for Name: TipoOrganizacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TipoOrganizacion" (id, nombre, descripcion, "createdAt", "updatedAt") FROM stdin;
1	Banda	Agrupación Criminal 	2024-12-19 00:00:00	2024-12-19 00:00:00
2	Concertación	sujetos concertados para realizar uno o mas delitos en un rango de fecha determinado	2024-12-19 00:00:00	2024-12-19 00:00:00
\.


--
-- TOC entry 5147 (class 0 OID 16530)
-- Dependencies: 255
-- Data for Name: Tribunal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tribunal" (id, nombre) FROM stdin;
1	TG La Serena
2	TG Coquimbo
3	TG Ovalle
4	TG Los Vilos
5	TG Illapel
6	TG Combarbalá
7	TG Andacollo
8	TG Vicuña
9	TOP La Serena
10	TOP Ovalle
11	No definido
12	Otro
\.


--
-- TOC entry 5149 (class 0 OID 16536)
-- Dependencies: 257
-- Data for Name: Victima; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Victima" (id, "nombreVictima", "docId", "nacionalidadId") FROM stdin;
\.


--
-- TOC entry 5151 (class 0 OID 16542)
-- Dependencies: 259
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3cc2cb1d-7b4c-4dfa-bc6d-3e3198ede1f2	bbe7457e487ba4fd0cfd0274c197465fda69f6fef1d98fd380efa89d87fe6090	2024-12-17 16:13:04.460142+00	20241217161304_migracion	\N	\N	2024-12-17 16:13:04.249804+00	1
\.


--
-- TOC entry 5152 (class 0 OID 16549)
-- Dependencies: 260
-- Data for Name: proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedores (id, nombre) FROM stdin;
1	Entel\n
2	Movistar
3	Claro
4	Wom
\.


--
-- TOC entry 5154 (class 0 OID 16555)
-- Dependencies: 262
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre, descripcion, "createdAt", "updatedAt") FROM stdin;
1	ADMIN	Acceso total al sistema	2024-11-30 13:43:12.409	2024-11-30 13:43:12.409
2	WRITE	Puede crear y modificar registros	2024-11-30 13:43:12.409	2024-11-30 13:43:12.409
3	READ	Solo puede ver registros	2024-11-30 13:43:12.409	2024-11-30 13:43:12.409
\.


--
-- TOC entry 5156 (class 0 OID 16562)
-- Dependencies: 264
-- Data for Name: telefonos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.telefonos (id, "idProveedorServicio", imei, abonado, "solicitaTrafico", "solicitaImei", observacion, "numeroTelefonico", "extraccionForense") FROM stdin;
2	2	353779102647841	No definido	f	t	Telefono de ALEXIS ANTONIO SIERRA CASTRILLON	974218700	\N
3	1	353597111191324	Javier Marquez	f	f	Telefono con Puente de carga descompuesto, no es posible hacer extrtacción forense	56968633223	t
5	1	357928274044727	Jose Pizarro Pizarro	f	f	Samsung SM-S918b DS Galaxy S23 Ultra Extraccion OK. 7478740	56996325926	f
7	2	353472170448058	Johan\tPérez Guerra	f	f	 \nDevice Name: Samsung SM-S926b Galaxy S24+\nIMEI / MEID: 353472170448058\nIMEI / MEID: 355898800448050	5698938639	f
8	2	358251526878159	Isabel Aranda	f	f	IMEI / MEID: 358251526878159\nDevice Name: Samsung SM-A055m DS Galaxy A05	56923771945	t
4	2	357928274044727	Jose Aranda	f	f	Samsung Galaxy A14	56961314602	t
6	2	 353842196657702	Álvaro\tZepeda Gómez	f	f	Device Name: Samsung SM-A536e DS Galaxy A53 5GÁlvaro\tZepeda\tGómez Extraccion forense ok\n 	947392254	t
9	2	357928274044727	Jose Aranda	f	f	Samsung SM-A146m DS Galaxy A14 5G\\\n 	56961314602	t
10	1	350888743371050	Johan\tPérez\tGuerra	f	f	Apple iPhone 12 Pro Max 5G (A2342)\nTel: +56965434904\nTel: +56940164230\nTel: +56930521987\nTel: +56946828870	56946828870	t
\.


--
-- TOC entry 5157 (class 0 OID 16567)
-- Dependencies: 265
-- Data for Name: telefonos_causa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.telefonos_causa (id, "idTelefono", "idCausa") FROM stdin;
8	2	102
9	3	97
10	4	86
11	5	86
12	6	86
13	7	86
14	8	86
15	9	86
16	10	86
\.


--
-- TOC entry 5160 (class 0 OID 16572)
-- Dependencies: 268
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, clerk_id, email, nombre, cargo, "rolId", "createdAt", "updatedAt") FROM stdin;
1	user_2pZpe1TEXe5cjuPIgcasOFboGv4	ramos.aqueda@gmail.com	Rafael	Analista	1	2024-11-30 17:14:42.107	2024-11-30 00:00:00
2	user_2pDKUtBa0TzA0qrZP2kpz0cqWPB	rramos@minpublico.cl	Rafael	Analista	1	2024-11-30 17:14:42.107	2024-11-30 00:00:00
3	1	bleon@minpubnlico.cl	Barbara León	Analista\n	2	2024-12-18 17:14:42.107	2024-12-18 17:14:42.107
4	2	hdiaz@minpublico.cl	Harry Diaz	Analista	2	2024-12-18 17:14:42.107	2024-12-18 17:14:42.107
5	3	hastudillo@minpublico.cl	Hector Astudillo	Analista	2	2024-12-18 17:14:42.107	2024-12-18 17:14:42.107
6	user_2qAPyWTD8N8FbLL2QWOOIkojNRE	daniela.castro02@alumnos.ucn.cl	Daniela Castro	Developer	1	2024-12-13 17:14:42.107	2024-12-13 17:14:42.107
\.


--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 218
-- Name: Abogado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Abogado_id_seq"', 1, false);


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 220
-- Name: Actividad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Actividad_id_seq"', 4, true);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 222
-- Name: Analista_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Analista_id_seq"', 1, false);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 224
-- Name: Area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Area_id_seq"', 3, true);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 226
-- Name: Causa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Causa_id_seq"', 117, true);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 229
-- Name: CausasRelacionadas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CausasRelacionadas_id_seq"', 13, true);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 232
-- Name: Cautelar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cautelar_id_seq"', 6, true);


--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 234
-- Name: Comuna_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comuna_id_seq"', 1, false);


--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 236
-- Name: Delito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Delito_id_seq"', 1, false);


--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 238
-- Name: Fiscal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Fiscal_id_seq"', 1, false);


--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 240
-- Name: Foco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Foco_id_seq"', 1, false);


--
-- TOC entry 5206 (class 0 OID 0)
-- Dependencies: 242
-- Name: Fotografia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Fotografia_id_seq"', 57, true);


--
-- TOC entry 5207 (class 0 OID 0)
-- Dependencies: 244
-- Name: Imputado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Imputado_id_seq"', 102, true);


--
-- TOC entry 5208 (class 0 OID 0)
-- Dependencies: 246
-- Name: MiembrosOrganizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MiembrosOrganizacion_id_seq"', 50, true);


--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 248
-- Name: Nacionalidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Nacionalidad_id_seq"', 1, false);


--
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 250
-- Name: OrganizacionDelictual_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrganizacionDelictual_id_seq"', 7, true);


--
-- TOC entry 5211 (class 0 OID 0)
-- Dependencies: 252
-- Name: TipoActividad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoActividad_id_seq"', 5, true);


--
-- TOC entry 5212 (class 0 OID 0)
-- Dependencies: 254
-- Name: TipoOrganizacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoOrganizacion_id_seq"', 2, true);


--
-- TOC entry 5213 (class 0 OID 0)
-- Dependencies: 256
-- Name: Tribunal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tribunal_id_seq"', 1, false);


--
-- TOC entry 5214 (class 0 OID 0)
-- Dependencies: 258
-- Name: Victima_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Victima_id_seq"', 1, false);


--
-- TOC entry 5215 (class 0 OID 0)
-- Dependencies: 261
-- Name: proveedores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedores_id_seq', 4, true);


--
-- TOC entry 5216 (class 0 OID 0)
-- Dependencies: 263
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 5217 (class 0 OID 0)
-- Dependencies: 266
-- Name: telefonos_causa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.telefonos_causa_id_seq', 16, true);


--
-- TOC entry 5218 (class 0 OID 0)
-- Dependencies: 267
-- Name: telefonos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.telefonos_id_seq', 10, true);


--
-- TOC entry 5219 (class 0 OID 0)
-- Dependencies: 269
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


-- Completed on 2025-01-22 09:33:32

--
-- PostgreSQL database dump complete
--

