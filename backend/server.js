import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5003;

app.get("/", (req, res) => {
	// root route http://localhost:5003/
	res.send("hello word");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
