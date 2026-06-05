import { io } from "socket.io-client";
import { useEffect,useState,useRef } from "react";




const socket = io("http://localhost:5000");

function App() {
const [typedMessage, setTypedMessage] = useState("");
const [allMessages, setAllMessages] = useState([]);
const myCameraVideoTag=useRef(null);
const sendMessage = () => {
   socket.emit(
      "chat-message",
      {
         roomCode: "fd-DOG",
         message: typedMessage
      }
   );
   setTypedMessage("");
};

  useEffect(() => {
   navigator.mediaDevices.enumerateDevices()
.then(devices => console.log(devices));
    
    socket.emit(
   "join-room",
   "fd-DOG"
);
socket.on("user-joined", (msg) => {
   console.log(msg);
});
socket.on(
   "receive-message",
   (incomingMessage) => {

      setAllMessages(
         (previousMessages) => [
            ...previousMessages,
            incomingMessage
         ]
      );

   }
);
 const startCamera = async () => {
   try {

      const myCameraStream =
        await navigator.mediaDevices.getUserMedia({
   video: {
      width: 640,
      height: 480
   },
   audio: false
});

      console.log("VIDEO TRACKS");
      console.log(myCameraStream.getVideoTracks());

      console.log("AUDIO TRACKS");
      console.log(myCameraStream.getAudioTracks());

      myCameraVideoTag.current.srcObject =
         myCameraStream;

   } catch (error) {

      console.log("FULL ERROR");
      console.log(error);

      console.log("ERROR NAME");
      console.log(error.name);

      console.log("ERROR MESSAGE");
      console.log(error.message);

   }
};

   startCamera();

}, []);

  return (
    <>
     <h1>Interview Arena</h1>
    <input value={typedMessage} 
    onChange={(e)=>{
      setTypedMessage(e.target.value);
    }} 
    />
   <button
   onClick={sendMessage}
>
   Send
</button>
{
  allMessages.map((singlemsg,index)=>{
    return (
      <p key={index}>{singlemsg}</p>
    )
  })
}
<video
  ref={myCameraVideoTag}
  autoPlay
  playsInline
/>
    </>
   
  );
}

export default App;