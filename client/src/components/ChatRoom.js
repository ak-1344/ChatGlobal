import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import MessageList from './MessageList';
import UserList from './UserList';
import InputBox from './InputBox';

const ChatRoom = ({ roomCode, userName, isCreator, roomData }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    if (roomData) {
      setUsers(roomData.users);
      setMessages(roomData.messages);
    }

    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('load-messages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('update-users', (userList) => {
      setUsers(userList);
    });

    socket.on('messages-cleared', () => {
      setMessages([]);
    });

    return () => {
      socket.off('receive-message');
      socket.off('update-users');
      socket.off('load-messages');
      socket.off('messages-cleared');
    };
  }, []);

  const handleDelete = () => {
    if (window.confirm('Clear all messages?')) {
      socket.emit('delete-messages', { roomCode });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Room: {roomCode}</h2>
      <p>You are: {userName}</p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <UserList users={users} />
        <div>
          <MessageList messages={messages} />
          <InputBox roomCode={roomCode} userName={userName} />
          {isCreator && (
            <button onClick={handleDelete} style={{ marginTop: '10px' }}>
              Delete All Messages
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
