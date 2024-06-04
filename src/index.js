import express from 'express';
import usersRoutes from './routes/users.routes.js';
import session from 'express-session';
import { PORT } from './config.js';

const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());

app.use('/api', usersRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

