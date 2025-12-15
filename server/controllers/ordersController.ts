import { sql } from '../config/db';
import { Request, Response } from 'express';
import {
    findAllOrders,
    findOrderById,
    insertOrder,
    updateOrderById,
    deleteOrderById
} from '../models/ordersModel';

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const order = await findAllOrders();
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await insertOrder(req.body);
        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        console.log('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await findOrderById(req.params.id);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log('Error fetching order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await updateOrderById(req.params.id, req.body);
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.log('Error updating Order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await deleteOrderById(req.params.id);
        res.status(200).json({ success: true, data: deletedOrder });
    } catch (error) {
        console.log('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


