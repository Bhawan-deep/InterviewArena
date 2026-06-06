import { io } from "socket.io-client";
import { useEffect,useState,useRef } from "react";





const socket = io("http://localhost:5000");

function App() {
const [typedMessage, setTypedMessage] = useState("");
const [allMessages, setAllMessages] = useState([]);
const myCameraVideoTag=useRef(null);
const  callConnectionRef=useRef(null);
const remoteVideoTag=useRef(null);



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
//sockets of sender;


    socket.emit(
   "join-room",
   "fd-DOG"
);

socket.on("user-joined", (msg) => {
   console.log(msg);
});
 socket.on("answer",async(answer)=>{
   await callConnectionRef.current.setRemoteDescription(answer);
   console.log("answer recieved");
   console.log(callConnectionRef.current.remoteDescription);
  })

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
  const myCameraStream =
await navigator.mediaDevices.getUserMedia({
   video: true,
   audio: true
});

callConnectionRef.current =
      new RTCPeerConnection();
      callConnectionRef.current.ontrack =
   (event) => {

      console.log(
         "REMOTE TRACK"
      );

      console.log(
         event.streams[0]
      );

      remoteVideoTag.current.srcObject =
         event.streams[0];
   };
      callConnectionRef.current.onicecandidate =
   (event) => {
      if(event.candidate){
         socket.emit("ice-candidate",event.candidate);
      }

   };

   callConnectionRef.current.onconnectionstatechange =
   () => {

      console.log(
         "STATE:",
         callConnectionRef.current
            .connectionState
      );

   };

   myCameraStream.getTracks().forEach((track) => {
      callConnectionRef.current.addTrack(track,myCameraStream);
      
   });
   console.log(
   callConnectionRef.current
);
  const offer=await callConnectionRef.current.createOffer();
  console.log(offer);

  await callConnectionRef.current.setLocalDescription(
   offer
);

console.log(
   callConnectionRef.current.localDescription
);
console.log(
   callConnectionRef.current.signalingState
);
console.log(
   callConnectionRef.current.localDescription.type
);

myCameraVideoTag.current.srcObject =
   myCameraStream;


   socket.emit("offer", offer); 
};
   startCamera();
 
//socket of reciever;
socket.on("offer",async(offer)=>{
   console.log("offer recieved");
   console.log(offer);
   await callConnectionRef.current.setRemoteDescription(offer);
   console.log("remote desc");
   console.log(callConnectionRef.current.remoteDescription)


const answer = await callConnectionRef.current.createAnswer();
await callConnectionRef.current.setLocalDescription(answer);
console.log(answer);
socket.emit("answer",answer);
})
socket.on("ice-candidate",async (candidate)=>{
   await callConnectionRef.current.addIceCandidate(candidate);
   console.log("added ice")

})

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
<video
   ref={remoteVideoTag}
   autoPlay
   playsInline
/>
    </>
   
  );
}

export default App;