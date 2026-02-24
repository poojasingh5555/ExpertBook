import { io } from "socket.io-client"



const socket = io("https://expertbook-4.onrender.com", {
  transports: ["websocket"],
});


export default socket;
