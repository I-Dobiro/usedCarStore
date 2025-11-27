import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { sql } from './config/db';
import carRoutes from './routes/carsRoutes';
import userRoutes from './routes/usersRoutes';
import ordersRoutes from './routes/ordersRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes)
app.use('/api/orders', ordersRoutes);

const initDB = async () => {
    try {
        const usersTable = await sql`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        const carTable = await sql`
        CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        seller_id INT REFERENCES users(id),
        title TEXT,
        description TEXT,
        price NUMERIC(10,2),
        make TEXT,
        model TEXT,
        year INT,
        mileage INT,
        images TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        const ordersTable = await sql`
        CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        buyer_id INT REFERENCES users(id),
        car_id INT REFERENCES cars(id),
        payment_status TEXT,
        total NUMERIC(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        // Initialize your database connection here
        console.log('Database initialized');
    } catch (error) {
        console.log('Database initialization failed:', error);
    }
}

const PORT = process.env.PORT || 3000;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
})

