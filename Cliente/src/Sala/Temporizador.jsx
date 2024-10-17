
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Temporizador.css';

const socket = io('http://localhost:3001'); // Conexão com o servidor Socket.IO (porta 3001)

const Contador = ({ onStatusPerguntaChange }) => { 
  
  const [tempo, setTempo] = useState(120);  // Estado do tempo
  const [statusPergunta, setStatusPergunta] = useState(1); //Estado da pergunta

  useEffect(() => { 
    
    socket.on('tempoAtualizado', (novoTempo) => { 
      
      setTempo(novoTempo); // Atualiza o estado "tempo" com o novo valor recebido.
    });

    socket.on('statusPerguntaAtualizado', (novoStatusPergunta) => { 
      
      setStatusPergunta(novoStatusPergunta); // Atualiza o estado "statusPergunta" com o novo valor.
      
      onStatusPerguntaChange(novoStatusPergunta); 
    });

    return () => {
      
      socket.off('tempoAtualizado');
      socket.off('statusPerguntaAtualizado');
    };
  }, [onStatusPerguntaChange]); 

  const formatarTempo = (segundos) => { 
    
    const minutos = Math.floor(segundos / 60);     
    const segundosRestantes = segundos % 60; 
    
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`; 
  };

  return (

    <div className='conteinerTop'>  

      <div className='bloco'>         
        <p className='tempo'>TEMPO RESTANTE: {formatarTempo(tempo)}</p>
      </div>
  
      <div className='bloco'> 
        <p>PERGUNTA {statusPergunta}/10</p> 
      </div>
    </div>
  );
};

export default Contador; 