import React, { useState } from 'react';
import { socket } from '../socket';

const Home = ({ setInRoom, setRoomData, setUserName, setRoomCode, setIsCreator }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState(null); // 'create' or 'join'
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !code) {
      setError('Name and Room Code required');
      return;
    }

    setUserName(name);
    setRoomCode(code);

    if (mode === 'create') {
      setIsCreator(true);
      socket.emit('create-room', { roomCode: code, userName: name });
    } else {
      setIsCreator(false);
      socket.emit('join-room', { roomCode: code, userName: name });
    }
  };

  socket.on('room-created', (data) => {
    setRoomData(data);
    setInRoom(true);
  });

  socket.on('room-joined', (data) => {
    setRoomData(data);
    setInRoom(true);
  });

  socket.on('error', (msg) => {
    setError(msg);
  });

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!mode ? (
        <>
          <button onClick={() => setMode('create')}>Create Room</button>
          <button onClick={() => setMode('join')}>Join Room</button>
        </>
      ) : (
        <div>
          <h2>{mode === 'create' ? 'Create Room' : 'Join Room'}</h2>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br /><br />
          <input
            placeholder="Enter Room Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          /><br /><br />
          <button onClick={handleSubmit}>Enter</button>
          <button onClick={() => setMode(null)}>Back</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
