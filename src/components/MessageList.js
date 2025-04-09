import React from 'react';

const MessageList = ({ messages }) => {
  const currentSocketId = window.localStorage.getItem('socketId'); // We'll store this from `socket.id` in a later step

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied!');
  };

  return (
    <div
      style={{
        minWidth: '100vh', // Set the minimum width of the screen
        maxHeight: '90vh',
        width: '100%',
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {messages.map((msg, i) => {
        const isSelf = msg.socketId === currentSocketId;

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: isSelf ? 'flex-end' : 'flex-start',
              marginBottom: '15px',
            }}
          >
            <div
              style={{
                backgroundColor: isSelf ? 'rgba(0, 120, 255, 0.8)' : '#d4edda',
                color: isSelf ? 'white' : 'black',
                padding: '15px',
                borderRadius: '20px',
                maxWidth: '50vh', // Set the maximum width of the message
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                wordWrap: 'break-word',
              }}
            >
              <strong style={{ fontSize: '0.9em', display: 'block', marginBottom: '5px' }}>
                {msg.userName}
              </strong>
              <p style={{ margin: '5px 0', fontSize: '1em', lineHeight: '1.5' }}>{msg.message}</p>
              <span
                style={{
                  fontSize: '0.75em',
                  color: isSelf ? '#d1eaff' : 'gray',
                  display: 'block',
                  marginTop: '5px',
                }}
              >
                {msg.time}
              </span>
              <button
                onClick={() => handleCopy(msg.message)}
                style={{
                  fontSize: '0.7em',
                  position: 'absolute',
                  bottom: '5px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  color: isSelf ? '#d1eaff' : 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Copy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
