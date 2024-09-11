
import React, { useRef } from 'react';
import './Chat.css';

const Chat = ({ messageList, username, handleSubmit }) => {

  const messageRef = useRef();

  return (
    <div className='chat'>
      <h2>CHAT PARA DISCUSSÃO</h2>

      <div className='mensagens'>
        {messageList.map((message, index) => (
          <p key={index} className={`msg ${message.author === username ? 'this' : ''}`}>
            {message.author}: {message.txt}
          </p>
        ))}
      </div>

      <div className='msgBot'>
        <input
          type="text"
          className='inputMensagens'
          placeholder="Digite sua mensagem"
          ref={messageRef}/>

        <button
          className='enviar'
          onClick={() => handleSubmit(messageRef.current.value)}>
          <p>Enviar</p>
        </button>
      </div>
      
    </div>
  );
};

export default Chat;
