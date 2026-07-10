import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 5003;

dotenv.config();

app.use(express.json()); // Middleware to parse JSON request bodies (from req.body)

app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
// 	// root route http://localhost:5003/
// 	res.send("hello word");
// });


app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server running in port ${PORT}`);
});
