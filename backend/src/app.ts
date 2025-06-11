import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipes';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.resolve(__dirname, '../../frontend/dist/assets')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
});

app.use('/api/recipes', recipeRoutes);

export default app;
