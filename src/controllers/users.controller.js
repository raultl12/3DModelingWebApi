import {pool} from '../db.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const getUsers = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM users");

    res.json(rows);
}

export const insertUser = async (req, res) => {

    const {name, password } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    await pool.query("INSERT INTO users (name, password) VALUES (?, ?)", [name, hash]);

    res.json({ message: 'User created' });
}

export const getUserWithId = async (req, res) => {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    res.json(rows);
}

export const userLogin = async (req, res) => {
    try {
        const { name, password } = req.body;
        const [rows] = await pool.query("SELECT password FROM users WHERE name = ?", [name]);

        if (rows.length === 0) {
            return res.status(401).send('Unauthorized'); // Usuario no encontrado
        }

        const databaseHash = rows[0].password;
        const passMatch = await bcrypt.compare(password, databaseHash);

        if (passMatch) {
            // Guardar la sesión
            req.session.user = {
                name: name,
                loggedIn: true
            };
            // No devolver nada en la respuesta
            res.sendStatus(204); // No Content
        } else {
            res.status(401).send('Unauthorized'); // Contraseña incorrecta
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const userLogout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(204);
}