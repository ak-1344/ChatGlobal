import React, { useState } from 'react';
import { socket } from '../socket';

const InputBox = ({ roomCode, userName }) => {
  const [msg, setMsg] = useState('');

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit('send-message', {
        roomCode,
        userName,
        message: msg,
        socketId: socket.id
      });

      setMsg('');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      margin: '10px 0',
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginRight: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;
