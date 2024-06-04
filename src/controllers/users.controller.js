import {pool} from '../db.js';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'

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