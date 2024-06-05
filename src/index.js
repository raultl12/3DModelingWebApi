import express from 'express';
import usersRoutes from './routes/users.routes.js';
import session from 'express-session';
import { PORT } from './config.js';

const app = express();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());

app.use('/api', usersRoutes);

app.get('/', (req, res) => {
    //Mostrar usuario logueado, si no hay, inicarlo
    if(req.session.user){
        res.send(`Bienvenido ${req.session.user}`);
    }
    else{
        res.send('No hay usuario logueado');
    }
});


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

