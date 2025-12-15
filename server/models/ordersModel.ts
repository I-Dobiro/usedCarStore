import { sql } from '../config/db';

export const findAllOrders = async () => {
    return await sql`
        SELECT * FROM orders
        ORDER BY created_at DESC`
};

export const findOrderById = async (id: string) => {
    const result = await sql`
        SELECT * FROM orders WHERE id = ${id}
    `;
    return result[0];
};

export const insertOrder = async (orderData: {
    buyer_id: number;
    car_id: number;
    payment_status: string;
    total: number;
    created_at?: Date;
}) => {
    const result = await sql`
        INSERT INTO orders (buyer_id, car_id, payment_status, total, created_at)
        VALUES (
            ${orderData.buyer_id}, ${orderData.car_id}, ${orderData.payment_status},
            ${orderData.total}, ${orderData.created_at}
        )
        RETURNING *
    `;
    return result[0];
};

export const updateOrderById = async (id: string, orderData: any) => {
    const result = await sql`
        UPDATE orders
        SET buyer_id = ${orderData.buyer_id},
            car_id = ${orderData.car_id},
            payment_status = ${orderData.payment_status},
            total = ${orderData.total},
            created_at = ${orderData.created_at}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
};

export const deleteOrderById = async (id: string) => {
    const result = await sql`
        DELETE FROM orders WHERE id = ${id} RETURNING *
    `;
    return result[0];
};