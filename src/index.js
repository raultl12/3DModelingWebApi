import express from 'express';
import usersRoutes from './routes/users.routes.js';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { PORT } from './config.js';
const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Origen permitido
  credentials: true // Permitir el envío de cookies
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a true si usas HTTPS
}));
/*
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Origen permitido
    credentials: true // Permitir el envío de cookies
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
*/
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

