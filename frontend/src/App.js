import React, { useState, useEffect } from 'react';
import ioClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3333';
const socket = ioClient(ENDPOINT);

function App() {
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('getAllUsers');
  }, [])
  
  socket.on('receivedMessage', data => {
    setResponses([...responses, data]);
  });

  socket.on('allUsers', data => {
    setUsers(data);
  });

  const enviar = (e, message) => {
    e.preventDefault();
    setResponses([...responses, message]);
    socket.emit('sendMessage', message);
  }

  return (
    <div>
      <form onSubmit={e => enviar(e, message)}>
        <input type="text" onChange={e => setMessage(e.target.value)}/>
        <button type="submit">Enviar</button>

        <ul>
          {responses.map(response => <li>{response}</li>)}
        </ul>
        <ul>
          {users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </form>
    </div>
  )
}

export default App;
