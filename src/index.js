import express from 'express';
import usersRoutes from './routes/users.routes.js';
import scenesRoutes from './routes/scenes.routes.js';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { PORT } from './config.js';
const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/api', usersRoutes);
app.use('/api', scenesRoutes);

app.get('/', (req, res) => {
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

