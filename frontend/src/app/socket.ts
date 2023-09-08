import { io } from "socket.io-client"

export function configSocket() {
  const url = import.meta.env.VITE_SOCKET_URL ?? "localhost:3000"
  const socket = io(url, {
    withCredentials: true,
    autoConnect: false,
  })

  return socket
}
