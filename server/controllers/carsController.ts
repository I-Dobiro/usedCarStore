
import { Request, Response } from 'express';
import {
    findAllCars,
    findCarById,
    insertCar,
    updateCarById,
    deleteCarById
} from '../models/carsModel';

export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await findAllCars();
        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        console.log('Error fetching cars:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getCarById = async (req: Request, res: Response) => {
    try {
        const car = await findCarById(req.params.id);
        res.status(200).json({ success: true, data: car });
    } catch (error) {
        console.log('Error fetching car:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createCar = async (req: Request, res: Response) => {
    try {
        const newCar = await insertCar(req.body);
        res.status(201).json({ success: true, data: newCar });
    } catch (error) {
        console.log('Error creating car:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updateCar = async (req: Request, res: Response) => {
    try {
        const updatedCar = await updateCarById(req.params.id, req.body);

        if (!updatedCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        res.status(200).json({ success: true, data: updatedCar });
    } catch (error) {
        console.log('Error updating car:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const deletedCar = await deleteCarById(req.params.id);
        res.status(200).json({ success: true, data: deletedCar });
    } catch (error) {
        console.log('Error deleting car:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
