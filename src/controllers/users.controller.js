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
    console.log(req.body);
    try {
        const { user, password } = req.body;
        const [rows] = await pool.query("SELECT password FROM users WHERE name = ?", [user]);

        if (rows.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' }); // Usuario no encontrado
        }

        const databaseHash = rows[0].password;
        const passMatch = await bcrypt.compare(password, databaseHash);

        if (passMatch) {
            req.session.regenerate(function (err) {
                if (err) res.status(500).send('Internal Server Error')
                req.session.user = user
                req.session.save();
                res.status(200).json({ status: 'ok' });
            })
        } else {
            res.status(401).json({ status: 'error', message: 'Unauthorized' }); // Contraseña incorrecta
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

export const userLogout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({ status: 'ok' });
}