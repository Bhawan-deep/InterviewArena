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
      {
         sender: data.sender,
         message: data.message
      }
   );

});
  socket.on("offer",(offer)=>{
    console.log(`offer recieved from ${socket.id}`);
    socket.broadcast.emit("offer",offer);
    console.log(`offer emitted`);
    
  })
  socket.on("answer",(answer)=>{
    socket.broadcast.emit("answer",answer);
  })
   socket.on("ice-candidate",(candidate)=>{
    socket.broadcast.emit("ice-candidate",candidate);
   });
   socket.on("code-change", (code) => {

   socket.broadcast.emit(
      "code-change",
      code
   );
});
socket.on(
   "language-change",
   (language)=>{

      socket.broadcast.emit(
         "language-change",
         language
      );

   }
);
socket.on(
   "output-change",
   (output) => {

      socket.broadcast.emit(
         "output-change",
         output
      );

   }
);



  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});