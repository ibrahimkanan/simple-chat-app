import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			console.error("No token found in cookies");
			return res.status(401).json({ error: "Unauthorized access" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			console.error("Invalid token");
			return res.status(401).json({ error: "Unauthorized access" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			console.error("User not found for the provided token");
			return res.status(404).json({ error: "Unauthorized access" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Error in protectRoute middleware:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
