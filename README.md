# 💬 Minimal Group Chat App (React + Socket.IO)

Welcome to the **Lab Chat Room** – a lightweight and minimal group chatting web app built using **React** for the frontend and **Socket.IO with Node.js** on the backend.

---

## 🚀 Features

- ✅ Join a room by entering a **room code** and your **anonymous name**.
- ✅ Create a room with a unique code (no authentication required).
- ✅ See the **list of users** currently in the room.
- ✅ Send and receive real-time messages.
- ✅ Messages appear:
  - On the **right** in a light green box if you sent them.
  - On the **left** in a white box for received messages.
- ✅ Copy messages easily using the **copy** button.
- ✅ Room creator has the ability to **delete all messages**.
- ✅ If the **room creator leaves**, the room gets **destroyed automatically** (messages and data cleared).
- ✅ Clean, mobile-like UI mimicking real chat apps.
- ✅ Deployed via **GitHub Pages** (see `/docs` folder).

---

## ⚙️ Tech Stack

- **Frontend**: React, HTML/CSS (no external frameworks)
- **Backend**: Node.js, Express, Socket.IO
- **Deployment**: GitHub Pages

---

## 🏗️ File Structure

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── ChatRoom.js
│   │   ├── MessageList.js
│   │   ├── InputBox.js
│   │   └── UserList.js
│   ├── App.js
│   └── index.js
├── server/
│   ├── index.js
│   └── (optional) roomManager.js
├── docs/
│   └── (Static build for GitHub Pages)
├── package.json
└── README.md
```

---

## 🧪 How to Run Locally

1. **Clone the repository**
2. Run backend:
   ```bash
   cd server
   npm install
   node index.js
   ```
3. Run frontend:
   ```bash
   cd ..
   npm install
   npm start
   ```

---

## 🌐 Deployment Notes

The production build is copied to `/docs` to allow deployment via **GitHub Pages**.
To rebuild and deploy:
```bash
npm run build
cp -r build/* docs/
```

Set GitHub Pages source to:
- Branch: `main`
- Folder: `/docs`

---

## 🔴 **This project is currently in progress. Actively being worked on!**

