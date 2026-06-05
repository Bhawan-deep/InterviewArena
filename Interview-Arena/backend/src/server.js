require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");


const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

const server=http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

 
  socket.on("join-room", (roomCode) => {

   socket.join(roomCode);

   console.log(
      `${socket.id} joined ${roomCode}`
   );

   io.to(roomCode).emit(
      "user-joined",
      `${socket.id} joined room`
   );
});
 socket.on("chat-message", (data) => {

   io.to(data.roomCode).emit(
      "receive-message",
      data.message
   );

});

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});