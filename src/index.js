import express from 'express';
import usersRoutes from './routes/users.routes.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());

app.use('/api', usersRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

