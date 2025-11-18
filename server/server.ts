import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { sql } from './config/db';
import carRoutes from './routes/carsRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/cars', carRoutes);

const initDB = async () => {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            seller_id INT,
            title TEXT,
            description TEXT,
            price NUMERIC(10,2),
            make TEXT,
            model TEXT,
            year INT,
            mileage INT,
            images TEXT[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
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

