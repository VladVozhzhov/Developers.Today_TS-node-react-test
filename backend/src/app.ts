import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);

export default app;
