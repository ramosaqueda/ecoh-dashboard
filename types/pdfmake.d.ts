declare module 'pdfmake/build/pdfmake' {
    import { pdfMake as PdfMakeInstance } from 'pdfmake/build/pdfmake';
    export = PdfMakeInstance;
  }
  
  declare module 'pdfmake/build/vfs_fonts' {
    const pdfFonts: any;
    export = pdfFonts;
  }