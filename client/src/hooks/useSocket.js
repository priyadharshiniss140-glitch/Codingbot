import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../auth/AuthContext.jsx";

export function useSocket(roomId) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setMessages([]);

    if (!token || !roomId) {
      setSocket(null);
      return undefined;
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3001";
    const chatSocket = io(socketUrl, {
      auth: { token },
      withCredentials: true,
    });

    const handleMessage = (message) => {
      setMessages((previous) => [...previous, message]);
    };

    // Queue the initial join before any user message; repeat it after reconnects
    // because Socket.io room membership is lost when a connection drops.
    let hasConnected = false;
    const handleConnect = () => {
      if (hasConnected) {
        chatSocket.emit("room:join", roomId);
      }
      hasConnected = true;
    };

    chatSocket.on("chat:message", handleMessage);
    chatSocket.on("connect", handleConnect);
    chatSocket.emit("room:join", roomId);
    setSocket(chatSocket);

    return () => {
      chatSocket.off("chat:message", handleMessage);
      chatSocket.off("connect", handleConnect);
      chatSocket.disconnect();
    };
  }, [token, roomId]);

  const sendMessage = useCallback(
    (text) => {
      const cleanText = typeof text === "string" ? text.trim() : "";
      if (!cleanText || !socket || !token) return;
      socket.emit("chat:message", { roomId, text: cleanText });
    },
    [socket, roomId, token]
  );

  return { messages, sendMessage };
}
