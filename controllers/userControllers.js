import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

const { hash, compare } = bcrypt;

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "2d",
    });
    return token;
};

const signup = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: "All fields are required" });

    const hashedPassword = await hash(password, 10);
    const isAlreadyRegistered = await User.findOne({ email });
    if (isAlreadyRegistered)
        return res.status(400).json({ error: "You are already registered" });

    try {
        const user = await User.create({ email, password: hashedPassword });
        const token = createToken(user._id);
        res.status(200).json({ success: "Registered successfully", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: "Invalid email address" });

        const isMatched = await compare(password, user.password);
        if (!isMatched)
            return res.status(400).json({ error: "Wrong password" });

        const token = createToken(user._id);
        res.status(200).json({ success: "Logged in successfully", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { signup, login };
