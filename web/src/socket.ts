import { io } from "socket.io-client";

const socket = io(":8000");

socket.on("connect", () => {
  console.log(socket.id);
});

export default socket;
