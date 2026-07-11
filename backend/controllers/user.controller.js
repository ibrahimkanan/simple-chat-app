import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggetdInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggetdInUserId } }).select("-password"); // Exclude the logged-in user from the results

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar controller:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
