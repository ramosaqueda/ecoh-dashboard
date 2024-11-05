import { NavItem } from '@/types';

export type Causa = {
  DENOMINACIONCAUSA: string;
  RUC: string;
  DELITO: string;
  FECHADELHECHO: string;
  FOCO: string;
  TRIBUNAL: string;
  RIT: string;
  FISCALACARGO: string;
  ABOGADO: string;
  ANALISTA: string;
  VICTIMA: string;
  RUT: string;
  NACIONALIDAD: string;
  FOLIOBW: string;
  UBICACION_SS: string;
  HOMICIO_CONSUMADO: boolean;
  CONSTITUYE_SS: boolean;
};
export const users: Causa[] = [
  {
    DENOMINACIONCAUSA: 'DESCUARTIZADO',
    RUC: '2301259952-8',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '16/11/2023',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '5733-2023',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'CRISTIAN CASTILLO PERINES',
    RUT: '19767347-8',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: 'S/N',
    UBICACION_SS: '-29.952580680700397, -71.33547007704335',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'RIVER LIDER',
    RUC: '2301299336-6',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '26/11/2023',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '5929-2023',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'MARCO ANDRES PASTEN GONZALEZ',
    RUT: '18632932-5',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: 'SN',
    UBICACION_SS: '-29.96183138648497, -71.26033025328815',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL GALPON',
    RUC: '2301320508-6',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '29/11/2023',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '6032-2023',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'HECTOR YEPE DURÁN',
    RUT: '14894271-4',
    NACIONALIDAD: 'VENEZOLANA',
    FOLIOBW: 'SN',
    UBICACION_SS: '-29.956529269502706, -71.33916396062831',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'SECUESTRO LA HERRADURA',
    RUC: '2301344616-4',
    DELITO: 'SECUESTRO',
    FECHADELHECHO: '05/12/2023',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '6101-2023',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'PATRICIO LOPEZ',
    ANALISTA: 'BARBARA LEON',
    VICTIMA:
      'GIOVANNY WILLIAMS SEGUNDO GOMEZ ZEPEDA BENJAMIN IGNACIO NEGRETE OLIVAREZ',
    RUT: '20407346-5 22496423-4',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: 'S/N',
    UBICACION_SS: '-29.97311751876197, -71.3686963026747',
    HOMICIO_CONSUMADO: false,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'PASAJE BRASIL',
    RUC: '2400157209-8',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '06/02/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '790-2024',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'SEBASTIAN IGNACIO CACERES TRUJILLO',
    RUT: '20717668-0',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-2-6950',
    UBICACION_SS: '-29.882364404506045, -71.24215721541569',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL CAMINO AMARILLO',
    RUC: '2400167162-2',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '07/02/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '4494-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ ',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'JONATHAN ALEXIS NAVARRETE CACERES',
    RUT: '14159594-6',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-2-8875',
    UBICACION_SS: '-29.914445752634656, -71.22428084661519',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO BLEST GANA',
    RUC: '2400175742-K',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '08/02/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG OVALLE',
    RIT: '602-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'BASTIAN FRANCISCO ORTIZ CACERES',
    RUT: '19667098-K',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-2-10380',
    UBICACION_SS: '-30.609202571431066, -71.20035706449339',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO EL CADDIE',
    RUC: '2400283076-7',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '11/03/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '1310-2024',
    FISCALACARGO: 'CARLOS VIDAL  MERCADO',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'PATRICIO ALEJANDRO YAÑEZ OPAZO',
    RUT: '13760497-3',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-3-12550',
    UBICACION_SS: '-29.979544333528263, -71.28849316425519',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO LA DIVA',
    RUC: '2400310135-1 ',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '15/03/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG OVALLE',
    RIT: '665-2024',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'MAIRA GABRIELA MARTINEZ GRATEROL',
    RUT: 'DNI 31116634',
    NACIONALIDAD: 'VENEZOLANA',
    FOLIOBW: '2024-3-19622',
    UBICACION_SS: '-30.6018863,-71.2048707',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'RAPIDO Y FURIOSO',
    RUC: '2400318400-1 ',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '17/03/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '1836-2024',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'BARBARA LEON',
    VICTIMA: 'CESAR EDUARDO GODOY ESPINOZA',
    RUT: '15673839-5',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-3-22744',
    UBICACION_SS: '-29.907083065237387, -71.25712968226432',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'SECUESTRO EL PASEO',
    RUC: '2400358806-4',
    DELITO: 'SECUESTRO',
    FECHADELHECHO: '27/03/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '1636-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ ',
    ABOGADO: 'PATRICIO LOPEZ',
    ANALISTA: 'BARBARA LEON',
    VICTIMA: 'FERNANDO JOSE FIGUEREDO OSTOS',
    RUT: 'D.N.I. 28380127',
    NACIONALIDAD: 'VENEZOLANA',
    FOLIOBW: '2024-3-37818',
    UBICACION_SS: '-29.961799027831596, -71.25595182960566',
    HOMICIO_CONSUMADO: false,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'RULETA RUSA OVALLE',
    RUC: '2400362167-3',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '29/03/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG OVALLE',
    RIT: '780-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ ',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'PAULINA ALEJANDRA CÁCERES ESPINOZA',
    RUT: '22224972-4',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-3-42680',
    UBICACION_SS: '-30.585982049271426, -71.19954071524707',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL LIMPIAPARABRISAS',
    RUC: '2400401487-8',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '08/04/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '3172-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ',
    ABOGADO: 'PATRICIO LOPEZ',
    ANALISTA: 'BARBARA LEON',
    VICTIMA: 'MARCOS CAICEDO VALENCILLA',
    RUT: '14.881.411-2',
    NACIONALIDAD: 'COLOMBIANO',
    FOLIOBW: '2024-4-12015',
    UBICACION_SS: '-29.912596425993183, -71.22270705596885',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL PACTO',
    RUC: '2400415743-1',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '09/04/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '526-2024',
    FISCALACARGO: 'NICOLÁS NICOREANU RODRIGO',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'JUAN PABLO POBLETE PLAZA',
    RUT: '18.632.529-K',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-4-14606',
    UBICACION_SS: '-31.775866, -70.991556',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'SECUESTRO EL DELIVERY',
    RUC: '2400417889-7',
    DELITO: 'SECUESTRO',
    FECHADELHECHO: '08/04/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '3669-2024',
    FISCALACARGO: 'NICOLÁS NICOREANU RODRIGO',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'JOAQUIN IGNACIO ZEPEDA GUERRERO',
    RUT: '20.457.537-1',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-4-14893',
    UBICACION_SS: '-29.92472279876936, -71.25899316208688',
    HOMICIO_CONSUMADO: false,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL PANTANO',
    RUC: '2400421251-3',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '11/04/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '2382-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ ',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'SERGIO ALFREDO ARRIAGADA BARRIA',
    RUT: '15.895.330-7',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-4-17839',
    UBICACION_SS: '-29.963015777147724, -71.33175263163861',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'BLUE RAIN ',
    RUC: '2400478139-9',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '25/04/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '2984-2024',
    FISCALACARGO: 'NICOLÁS NICOREANU RODRIGO',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'LUIS ALBERTO COSIO CARDONA ',
    RUT: '1119582726',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-4-35494',
    UBICACION_SS: '-29.91236518953749, -71.25914165869527',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'FOURTEEN YEARS',
    RUC: '2400481752-0',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '28/04/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '2304-2024',
    FISCALACARGO: 'NICOLÁS NICOREANU RODRIGO',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'BENJAMÍN ALEXANDER FRANCISCO CARRASCO CASANUEVA',
    RUT: '22339053-6',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-4-39038',
    UBICACION_SS: '-29.962807089146086 ,  -71.3336312658804',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'LOS PRIMOS',
    RUC: '2400531541-3',
    DELITO: 'HALLAZGO DE CADAVER',
    FECHADELHECHO: '10/05/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: 'null',
    FISCALACARGO: 'EDUARDO YAÑEZ',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'NN',
    RUT: 'null',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-5-9268',
    UBICACION_SS: '-30.219930, -71.363011',
    HOMICIO_CONSUMADO: false,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL AMANCER',
    RUC: '2400606321-3',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '28/05/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG LOS VILOS',
    RIT: '615-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'GABRIEL DEL CARMEN BUGUEÑO BUGUEÑO',
    RUT: '13537088-6 ',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-5-33753',
    UBICACION_SS: '-31.315369749246468, -71.3502919660111',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'LOS SALAMANCA',
    RUC: '2400627403-6',
    DELITO: 'SECUESTRO',
    FECHADELHECHO: '01/06/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG OVALLE',
    RIT: '1763-2024',
    FISCALACARGO: 'CARLOS VIDAL  MERCADO',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'JHONATAN STIVEN ORTIZ NARANJO',
    RUT: '1121925232',
    NACIONALIDAD: 'COLOMBIANA',
    FOLIOBW: '2024-6-2152',
    UBICACION_SS: '-30.574055, -70.880010',
    HOMICIO_CONSUMADO: false,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'NOCHE DE FURIA',
    RUC: '2400638256-4',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '04/06/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '4062-2024',
    FISCALACARGO: 'NICOLAS SHERTZER BARAONA',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'BARBARA LEON',
    VICTIMA: 'IGNACIO JAVIER CAROCA AGUILERA ',
    RUT: '16473747-0',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-64187',
    UBICACION_SS: '-29.910005786914976, -71.2571304528157',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'CAPITAN PALTA',
    RUC: '2400638367-6',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '04/06/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG OVALLE',
    RIT: 'null',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'GABRIEL PATRICIO CARVAJAL VÉLIZ',
    RUT: '21925388-5',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: 'SN',
    UBICACION_SS: '-30.588382, -71.168617',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'KAMIKAZE',
    RUC: '2400688944-8',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '16/06/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '4443-2024',
    FISCALACARGO: 'CARLOS VIDAL  MERCADO',
    ABOGADO: 'PATRICIO LOPEZ',
    ANALISTA: 'BARBARA LEON',
    VICTIMA: 'RENZO ANDRES BAZAN ALARCON',
    RUT: '20.737.934-4',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-6-20293',
    UBICACION_SS: '-29.932962536752097, -71.28156611077749',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'ZIG ZAG',
    RUC: '2400718295-K',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '23/06/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: '3605-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ',
    ABOGADO: 'MARCO CACERES',
    ANALISTA: 'RAFAEL RAMOS',
    VICTIMA: 'GABRIEL ALEJANDRO MIRANDA MUÑOZ',
    RUT: '17927202-4',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-6-29499',
    UBICACION_SS: '-29.940638,-71.338623',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO PARQUE URBANO CERRO GRANDE',
    RUC: '2400760588-5',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '03/07/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '5012-2024',
    FISCALACARGO: 'FREDDY SALINAS',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'HERALDO ESTEBAN COLLAO COLLAO\t',
    RUT: '19257740-3',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-2803',
    UBICACION_SS: 'null',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO ALFALFARES',
    RUC: '2400764779-0',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '03/07/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '5026-2024',
    FISCALACARGO: 'CARLOS VIDAL  MERCADO',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'CAMILA CONSTANZA ROJAS AYALA',
    RUT: '18810576-9',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-2920',
    UBICACION_SS: 'null',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO CLUB BELLAVISTA',
    RUC: '2400795451-0',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '10/07/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG OVALLE',
    RIT: '2248-2024',
    FISCALACARGO: 'NICOLÁS NICOREANU RODRIGO',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'RODRIGO ALEXIS VILLALON OLIVARES',
    RUT: '15.049.809-0',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-11747',
    UBICACION_SS: 'null',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'EL CARPINTERO PARQUE COLL',
    RUC: '2400643704-0',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '03/06/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: 'null',
    FISCALACARGO: 'NICOLAS SHERTZER BARAONA',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'William Alberto Toledo Silva',
    RUT: 'DNI 20.950.685',
    NACIONALIDAD: 'VENEZOLANA',
    FOLIOBW: '2024-6-3360',
    UBICACION_SS: '-29.909042, -71.235159',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO DR.',
    RUC: '2400795108-2',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '11/07/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '5321-2024',
    FISCALACARGO: 'NICOLÁS NICOREANU RODRIGO',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'NICOLAS ANDRES PINOCHET GARCIA',
    RUT: '16579041-3',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-13677',
    UBICACION_SS: 'null',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'KILOMETRO 512',
    RUC: '2400812129-6',
    DELITO: 'HALLAZGO DE CADAVER',
    FECHADELHECHO: '13/07/2024',
    FOCO: 'ECOH-ELQUI',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '5476-2024',
    FISCALACARGO: 'EDUARDO YAÑEZ  MUÑOZ',
    ABOGADO: 'PATRICIO LOPEZ',
    ANALISTA: 'BARBARA LEON',
    VICTIMA: 'NN',
    RUT: 'null',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-16541',
    UBICACION_SS: '-29.608625,-71.259354',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'CARIÑO MALO',
    RUC: '2400873685-1',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '27/07/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG LA SERENA',
    RIT: 'null',
    FISCALACARGO: 'RICARDO SOTO MOLINA',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'NNN',
    RUT: 'null',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-35984',
    UBICACION_SS: '-29.872185902852195, -71.23384535557469',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'HOMICIDIO TIA RICA',
    RUC: '2400874257-6',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '29/07/2024',
    FOCO: 'ECOH-LIMARI-CHOAPA',
    TRIBUNAL: 'TG LA SERENA',
    RIT: '5933-2024',
    FISCALACARGO: 'RICARDO SOTO MOLINA',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'NN',
    RUT: 'null',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-38438',
    UBICACION_SS: '-29.905681147264783, -71.25021150196343',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'LOS TAMBORES',
    RUC: '2400911606-7',
    DELITO: 'HOMICIDIO',
    FECHADELHECHO: '03/08/2024',
    FOCO: 'NO DEFINIDO',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: 'null',
    FISCALACARGO: 'null',
    ABOGADO: 'VERONICA CASTRO',
    ANALISTA: 'HECTOR ASTUDILLO',
    VICTIMA: 'JAMIE ANTONELLA ALFARO HERRERA',
    RUT: '20025828-2',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-8-3644',
    UBICACION_SS: 'null',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  },
  {
    DENOMINACIONCAUSA: 'Caso Avenida Brasil',
    RUC: '2400896910-4',
    DELITO: 'HALLAZGO DE CADAVER',
    FECHADELHECHO: '30/07/2024',
    FOCO: 'NO DEFINIDO',
    TRIBUNAL: 'TG COQUIMBO',
    RIT: 'null',
    FISCALACARGO: 'RICARDO SOTO MOLINA',
    ABOGADO: 'JUAN PABLO GONZALEZ',
    ANALISTA: 'HARRY DIAZ',
    VICTIMA: 'Irma del Transito Muñoz Araya',
    RUT: '8947807-3',
    NACIONALIDAD: 'CHILENA',
    FOLIOBW: '2024-7-42376',
    UBICACION_SS: 'null',
    HOMICIO_CONSUMADO: true,
    CONSTITUYE_SS: true
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Cauas',
    href: '/dashboard/causas',
    icon: 'user',
    label: 'user'
  },

  {
    title: 'Sujetos',
    href: '/dashboard/sujetos',
    icon: 'profile',
    label: 'profile'
  },

  {
    title: 'Comparativa Rostros',
    href: '/dashboard/compare',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
