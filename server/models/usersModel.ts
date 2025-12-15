import { sql } from '../config/db';

export const findAllUsers = async () => {
    return await sql`
        SELECT * FROM users
        ORDER BY created_at DESC
    `;
};

export const findUserById = async (id: string) => {
    const result = await sql`
        SELECT * FROM users WHERE id = ${id}
    `;
    return result[0];
};

export const insertUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
}) => {
    const result = await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${userData.name}, ${userData.email}, ${userData.password}, ${userData.role})
        RETURNING *
    `;
    return result[0];
};

export const updateUserById = async (id: string, userData: any) => {
    const result = await sql`
    UPDATE users
    SET name = ${userData.name},
        email = ${userData.email},
        password = ${userData.password},
        role = ${userData.role}
    WHERE id = ${id}
    RETURNING *
    `;
    return result[0];
};

export const deleteUserById = async (id: string) => {
    const result = await sql`
        DELETE FROM users WHERE id = ${id} RETURNING *
    `;
    return result[0];
};