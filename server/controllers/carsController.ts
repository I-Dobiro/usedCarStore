import { sql } from '../config/db';
import { Request, Response } from 'express';


export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await sql`
            SELECT * FROM cars
            ORDER BY created_at DESC`;
        console.log('fetched cars:', cars);
        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        console.log('Error fetching cars:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const getCarById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await sql`
            SELECT * FROM cars WHERE id = ${id}
        `;
        res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        console.log('Error fetching Car:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const createCar = async (req: Request, res: Response) => {
    const { seller_id, title, description, price, make, model, year, mileage, images } = req.body;
    if (!seller_id || !title || !description || !price || !make || !model || !year || !mileage || !images) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newCar = await sql`
            INSERT INTO cars (seller_id, title, description, price, make, model, year, mileage, images)
            VALUES(${seller_id}, ${title}, ${description}, ${price}, ${make}, ${model}, ${year}, ${mileage}, ${images})
            RETURNING *`;
        console.log('Created new car:', newCar);
        res.status(201).json({ success: true, data: newCar[0] });
    } catch (error) {
        console.log('Error creating car:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const updateCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { seller_id, title, description, price, make, model, year, mileage, images } = req.body;
    try {
        const updatedCar = await sql`
            UPDATE cars
            SET seller_id = ${seller_id}, title = ${title}, description = ${description}, price = ${price}, make = ${make}, model = ${model}, year = ${year}, mileage = ${mileage}, images = ${images}
            WHERE id = ${id}
            RETURNING *`;

        if (updatedCar.length === 0) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        res.status(200).json({ success: true, data: updatedCar[0] });
    } catch (error) {
        console.log('Error updating car:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedCar = await sql`
            DELETE FROM cars
            WHERE id = ${id}
            RETURNING *`;
        res.status(200).json({ success: true, data: deletedCar[0] });
    } catch (error) {
        console.log('Error deleting car:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
