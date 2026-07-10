import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
		httpOnly: true, // prevents client-side JavaScript from accessing the cookie (XSS attacks)
		sameSite: "strict", // prevents the browser from sending this cookie along with cross-site requests (CSRF attacks)
		secure: process.env.NODE_ENV === "development", // ensures the cookie is sent over HTTPS in production
	});
};

export default generateTokenAndSetCookie;
