import User from "../models/user.js";
import bycrypt, { compare } from "bcrypt";
import { createToken } from "../libs/token-manager.js";
import { COOKIE_NAME } from "../libs/constants.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
export const signup = async (req, res) => {
    try {
        // userSignup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: "User already exists" });
        }
        const user = new User({ name, email, password }); // Create user with plain text password
        user.password = await bycrypt.hash(user.password, 8); // Hash the password and assign it back to the user
        await user.save();
        //token creation and storage
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "Signed Up", user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        // userLogin
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ error: "User does not exist" });
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send({ error: "Wrong Password" });
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "Login Successful", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(201).json({ error: error.message });
    }
};
//# sourceMappingURL=user-handlers.js.map