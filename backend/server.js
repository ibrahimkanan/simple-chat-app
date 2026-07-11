import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 5003;

dotenv.config();

app.use(express.json()); // Middleware to parse JSON request bodies (from req.body)
app.use(cookieParser()); // Middleware to parse cookie values

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
// 	// root route http://localhost:5003/
// 	res.send("hello word");
// });

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server running in port ${PORT}`);
});
