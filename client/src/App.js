import React, { useState } from 'react';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isCreator, setIsCreator] = useState(false);

  return (
    <div>
      {inRoom ? (
        <ChatRoom
          roomCode={roomCode}
          userName={userName}
          isCreator={isCreator}
          roomData={roomData}
        />
      ) : (
        <Home
          setInRoom={setInRoom}
          setRoomData={setRoomData}
          setUserName={setUserName}
          setRoomCode={setRoomCode}
          setIsCreator={setIsCreator}
        />
      )}
    </div>
  );
}

export default App;
