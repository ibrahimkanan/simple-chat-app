import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecipientSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await conversation.save();

        // this will run in parallel and will be faster than running them sequentially
        await Promise.all([newMessage.save(), conversation.save()]);

        // ToDo: socket.io implementation for real-time messaging can be added here
        const receiverSocketId = getRecipientSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(receiverSocketId) : sends the event to the specific user
            io.to(receiverSocketId).emit("newMEssage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages"); // NOT REFERANCE but actual messages will be populated in the conversation object

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
