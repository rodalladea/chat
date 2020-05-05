import React, { useState } from 'react';
import ioClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3333';
const socket = ioClient(ENDPOINT);

function App() {
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');
  
  socket.on('receivedMessage', data => {
    console.log('oi');
    setResponse(data);
  });

  const enviar = (e, message) => {
    e.preventDefault();
    socket.emit('sendMessage', message);
  }

  return (
    <div>
      <form onSubmit={e => enviar(e, message)}>
        <input type="text" onChange={e => setMessage(e.target.value)}/>
        <button type="submit">Enviar</button>

        <p>{response}</p>
      </form>
    </div>
  )
}

export default App;
