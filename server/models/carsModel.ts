
import { sql } from '../config/db';

export const findAllCars = async () => {
    return await sql`
        SELECT * FROM cars
        ORDER BY created_at DESC
    `;
};

export const findCarById = async (id: string) => {
    const result = await sql`
        SELECT * FROM cars WHERE id = ${id}
    `;
    return result[0];
};

export const insertCar = async (carData: {
    seller_id: number;
    title: string;
    description: string;
    price: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
    images: string[];
}) => {
    const result = await sql`
        INSERT INTO cars (seller_id, title, description, price, make, model, year, mileage, images)
        VALUES(
            ${carData.seller_id}, ${carData.title}, ${carData.description}, ${carData.price},
            ${carData.make}, ${carData.model}, ${carData.year}, ${carData.mileage}, ${carData.images}
        )
        RETURNING *
    `;
    return result[0];
};

export const updateCarById = async (id: string, carData: any) => {
    const result = await sql`
        UPDATE cars
        SET seller_id = ${carData.seller_id},
            title = ${carData.title},
            description = ${carData.description},
            price = ${carData.price},
            make = ${carData.make},
            model = ${carData.model},
            year = ${carData.year},
            mileage = ${carData.mileage},
            images = ${carData.images}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
};

export const deleteCarById = async (id: string) => {
    const result = await sql`
        DELETE FROM cars WHERE id = ${id} RETURNING *
    `;
    return result[0];
};
