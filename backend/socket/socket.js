import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://simple-chat-app-ro03.onrender.com"],
        methods: ["GET", "POST"],
    },
});

export const getRecipientSocketId = (reveiverId) => {
    return userSocketMap[reveiverId];
};

const userSocketMap = {}; // userId -> socket.id

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // io.emit send to every user who is connected

    console.log("a user connected", socket.id);

    // Socket.on() listen to events from the client , can be used both in client and server
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };
