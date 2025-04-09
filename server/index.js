const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for dev)
  }
});

// In-memory room store
const rooms = {}; // { roomCode: { creatorId, users: [{ name, id }], messages: [] } }

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create-room', ({ roomCode, userName }) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = {
        creatorId: socket.id,
        users: [{ name: userName, id: socket.id }],
        messages: []
      };
      socket.join(roomCode);
      io.to(socket.id).emit('room-created', rooms[roomCode]);
      console.log(`Room ${roomCode} created by ${userName}`);
    } else {
      io.to(socket.id).emit('error', 'Room already exists.');
    }
  });

  socket.on('join-room', ({ roomCode, userName }) => {
    const room = rooms[roomCode];
    if (room) {
      room.users.push({ name: userName, id: socket.id });
      socket.join(roomCode);
      io.to(socket.id).emit('room-joined', room);
      io.to(roomCode).emit('update-users', room.users);
      socket.emit('load-messages', room.messages);
      console.log(`${userName} joined room ${roomCode}`);
    } else {
      io.to(socket.id).emit('error', 'Room does not exist.');
    }
  });

  socket.on('send-message', ({ roomCode, userName, message }) => {
    const time = new Date().toLocaleTimeString();
    const msgObj = { userName, message, time, socketId };
    if (rooms[roomCode]) {
      rooms[roomCode].messages.push(msgObj);
      io.to(roomCode).emit('receive-message', msgObj);
    }
  });

  socket.on('delete-messages', ({ roomCode }) => {
    if (rooms[roomCode] && rooms[roomCode].creatorId === socket.id) {
      rooms[roomCode].messages = [];
      io.to(roomCode).emit('messages-cleared');
      console.log(`Messages cleared in room ${roomCode}`);
    } else {
      io.to(socket.id).emit('error', 'Only the creator can delete messages.');
    }
  });

  socket.on('disconnect', () => {
    const roomCode = socketRoomMap[socket.id];
    const userName = socketUserMap[socket.id];
  
    if (roomCode) {
      const room = rooms[roomCode];
      if (room) {
        // Remove user from room
        room.users = room.users.filter(user => user.socketId !== socket.id);
  
        // Check if creator left
        if (room.creatorSocketId === socket.id) {
          // Notify all users in the room to exit
          io.to(roomCode).emit('room-destroyed');
  
          // Clean up
          delete rooms[roomCode];
          for (const id in socketRoomMap) {
            if (socketRoomMap[id] === roomCode) {
              delete socketRoomMap[id];
              delete socketUserMap[id];
            }
          }
  
          console.log(`Room ${roomCode} destroyed because creator left`);
        } else {
          // Notify others
          io.to(roomCode).emit('user-left', userName);
          socket.leave(roomCode);
          delete socketRoomMap[socket.id];
          delete socketUserMap[socket.id];
        }
      }
    }
  });  
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
