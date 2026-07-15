import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import useConversation from "../zustand/useCoversation";
import notificationSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMEssage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMEssage"); // cleanup
    }, [socket, messages, setMessages]);
};

export default useListenMessages;
