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

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(401).json({ message: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});

	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const logout = (req, res) => {
	try {
		res.clearCookie("jwt","",{ maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Error in logout controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
