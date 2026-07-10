import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	gender: {
		type: String,
		required: true,
		enum: ["male", "female"],
	},
	profilePic: {
		type: String,
		default: "",
	},
}, { timestamps: true });

// signup example { username: "john_doe", fullName: "John Doe", password: "password123" ,confirmPassword: "password123", gender: "male" }

const User = mongoose.model("User", userScehma);
export default User;