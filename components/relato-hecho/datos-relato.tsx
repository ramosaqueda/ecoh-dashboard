// components/DatosRelato.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Tokenizr} from 'ts-tokenizr';
import { removeStopwords, spa } from 'stopword';

interface RelatoProps {
  causaId: string;
}

const DatosRelato = ({ causaId }: RelatoProps) => {
  const [relato, setRelato] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [armasFuego, setArmasFuego] = useState(false);
  const [armasBlanca, setArmasBlanca] = useState(false);

  useEffect(() => {

    if(!causaId) {
      console.error('causaId no definido');
    }

    const fetchRelato = async () => {
      try {
        const response = (await axios.get(`/api/relato-hecho/${causaId}`));
        console.log(response.data.relato);
        setRelato(response.data.relato);
        tokenizeAndDetect(response.data.relato);
      } catch (error) {
        setError('Error fetching relato');
        console.error('Error fetching relato:', error);
      }
    };

    fetchRelato();
  }, [causaId]);

  const tokenizeAndDetect = (data: any) => {
    const text = data.toLowerCase();
    console.log(text);
    const tokenizer = new Tokenizr();

    tokenizer.rule(/\s+/, (ctx) => { ctx.ignore(); }); // Ignorar espacios en blanco
    tokenizer.rule(/[a-zA-Z0-9áéíóúñü]+/, (ctx, match) => {
      ctx.accept('word', match[0]);
    });
    tokenizer.rule(/./, (ctx, match) => { ctx.ignore(); }); // Ignorar cualquier otro carácter no reconocido

    tokenizer.input(text);
    let tokens: string[] = [];
    tokenizer.tokens().forEach(token => {
      if (typeof token.value === 'string') {
        tokens.push(token.value);
      }
    });

    tokens = tokens.filter(word => word.length > 0);
    tokens = removeStopwords(tokens, spa);
    setTokens(tokens);

    const expresiones = [/\bsecuestr\w*/, /\bpistol\w*/, /\bcriminal\w*/, /\bcuchillo/, /\bamenaz\w*/];
    const expArmasFuego = [/\bpistol\w*/, /\bala\w*/, /\dispar\w*/];
    const expArmasBlanca = [/\bcuchillo/];

    const detectarPalabra = (expReg: RegExp[], tokens: string[]): boolean => {
      for (const exp of expReg) {
        for (const token of tokens) {
          if (exp.test(token)) {
            return true;
          }
        }
      }
      return false;
    };

    setArmasFuego(detectarPalabra(expArmasFuego, tokens));
    setArmasBlanca(detectarPalabra(expArmasBlanca, tokens));
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!relato) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Relato</h2>
      <pre>{JSON.stringify(relato, null, 2)}</pre>
      <h3>Tokenización y Detección</h3>
      <p>Tokens: {tokens.join(', ')}</p>
      <p>Armas de Fuego: {armasFuego ? 'Sí' : 'No'}</p>
      <p>Armas Blancas: {armasBlanca ? 'Sí' : 'No'}</p>
    </div>
  );
};

export default DatosRelato;