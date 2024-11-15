
import React, { useRef, useEffect } from 'react';
import './Chat.css';

const Chat = ({ messageList, username, handleSubmit }) => {
  const messageRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(messageRef.current.value);
      messageRef.current.value = '';
    }
  };

  return (
    <div className='chat'>
      <h2>CHAT PARA DISCUSSÃO</h2>
      <div className='mensagens'>
        {messageList.map((message, index) => (
          <p key={index} className={`msg ${message.author === username ? 'this' : ''}`}>
            {message.author}: {message.txt}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='msgBot'>
        <input
          type="text"
          className='inputMensagens'
          placeholder="Digite sua mensagem"
          ref={messageRef}
          onKeyDown={handleKeyDown} />
        <button
          className='enviar'
          onClick={() => {
            handleSubmit(messageRef.current.value);
            messageRef.current.value = '';
          }}>
          <p>Enviar</p>
        </button>
      </div>
    </div>
  );
};

export default Chat;