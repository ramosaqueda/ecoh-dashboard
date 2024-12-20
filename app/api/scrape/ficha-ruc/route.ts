// app/api/scrape/ficha-ruc/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ruc = searchParams.get('ruc');
  
  if (!ruc) {
    return NextResponse.json({ error: 'RUC es requerido' }, { status: 400 });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_FICHACASORUC}?ruc=${ruc}`;
    console.log('Iniciando scraping de:', url);

    // Iniciar navegador
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    
    try {
      const page = await browser.newPage();
      
      // Configurar interceptación de requests
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
          request.abort();
        } else {
          request.continue();
        }
      });

      // Navegar a la página
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Esperar a que la sección de relato esté presente
      await page.waitForSelector('.header-label-seccion:contains("RELATO DEL HECHO DELICTUAL")', {
        timeout: 10000
      });

      // Extraer el relato
      const relato = await page.evaluate(() => {
        const headerSection = Array.from(document.querySelectorAll('.header-label-seccion'))
          .find(el => el.textContent?.trim() === 'RELATO DEL HECHO DELICTUAL');
        
        if (headerSection) {
          const row = headerSection.closest('.row');
          const nextRow = row?.nextElementSibling;
          const table = nextRow?.querySelector('table');
          const relatoCell = table?.querySelector('td.suj-td1');
          return relatoCell?.textContent?.trim() || null;
        }
        return null;
      });

      const data = {
        relato,
        debug: {
          url: page.url(),
          title: await page.title(),
          headers: await page.evaluate(() => {
            const headerElements = document.querySelectorAll('.header-label-seccion');
            return Array.from(headerElements).map(el => el.textContent?.trim());
          })
        }
      };

      await browser.close();
      return NextResponse.json(data);

    } catch (error) {
      await browser.close();
      throw error;
    }
    
  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      { 
        error: 'Error al obtener los datos', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}