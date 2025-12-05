import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sql } from "../config/db";
import { generateToken } from "../utils/generateToken";


export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Email check
    try {
        const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;

        const user = newUser[0];
        const token = generateToken(user.id);


        return res.status(201).json({
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

        const user = result[0];

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // password verification
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user.id);

        return res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
