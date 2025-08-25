import { useState, useEffect } from 'react';

export const useInspirationQuote = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const quotes = [
      "A música é a linguagem universal que conecta almas.",
      "Cada batida é uma oportunidade de criar uma nova conexão.",
      "Sua arte é única porque você é único. Nunca se esqueça disso.",
      "O autocuidado não é egoísmo, é a base para sua criatividade florescer.",
      "Grandes artistas não nascem prontos, eles se constroem dia após dia.",
      "Sua jornada é sua própria obra-prima em construção.",
      "Descanse quando precisar. O silêncio também faz parte da música.",
      "Celebre cada pequena vitória no seu caminho.",
      "Sua autenticidade é seu maior diferencial.",
      "Conecte-se com seu propósito todos os dias."
    ];
    
    // Simula um pequeno delay para dar sensação de carregamento
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      setLoading(false);
    }, 1000);
  }, []);

  return { quote, loading };
};