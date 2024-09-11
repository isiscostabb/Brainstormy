
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Temporizador.css';

const socket = io('http://localhost:3001'); // Ajuste a URL conforme necessário

const Contador = () => {
  const [tempo, setTempo] = useState(120); // 120 segundos = 2 minutos

  useEffect(() => {
    // Listener para o evento 'tempoAtualizado'
    socket.on('tempoAtualizado', (novoTempo) => {
      setTempo(novoTempo);
    });

    // Limpeza do listener ao desmontar o componente
    return () => {
      socket.off('tempoAtualizado');
    };
  }, []);

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  return (
    <div className='bloco'>
      <p className='tempo'>TEMPO RESTANTE: {formatarTempo(tempo)}</p>
    </div>
  );
};

export default Contador;
