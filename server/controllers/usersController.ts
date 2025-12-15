
import { Request, Response } from 'express';
import {
    findAllUsers,
    findUserById,
    insertUser,
    updateUserById,
    deleteUserById
} from '../models/usersModel';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await insertUser(req.body);
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await findUserById(req.params.id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log('Error fetching car:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUserById(req.params.id, req.body);

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await deleteUserById(req.params.id);
        res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        console.log('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};