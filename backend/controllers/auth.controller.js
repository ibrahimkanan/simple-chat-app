import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res
				.status(400)
				.json({ message: "Password and confirm password do not match" });
		}

		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ message: "Username already exists" });
		}

		// hash the password before saving to the database
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// https://avatarapi.runflare.run/

		const boyProfilePic = `https://avatarapi.runflare.run/boy?username=${username}`;
		const girlProfilePic = `https://avatarapi.runflare.run/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// generate JWT token for the user
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		console.error("Error in signup controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
