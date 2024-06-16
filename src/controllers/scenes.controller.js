import {pool} from '../db.js';

export const getUserScenes = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id FROM users WHERE name = ?", [req.session.user]);
        const userId = rows[0].id;

        const [scenes] = await pool.query("SELECT scenes.id, scenes.name, scenes.content FROM scenes INNER JOIN creates ON scenes.id = creates.sceneId WHERE creates.userId = ?", [userId]);
        res.status(200).json({ status: 'ok', scenes: scenes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

export const saveScene = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id FROM users WHERE name = ?", [req.session.user]);
        const userId = rows[0].id;

        const {scene} = req.body;
        const [sceneRows] = await pool.query("INSERT INTO scenes (name, content) VALUES (?,?)", ["new scene", scene]);
        const sceneId = sceneRows.insertId;

        await pool.query("INSERT INTO creates (userId, sceneId) VALUES (?, ?)", [userId, sceneId]);

        res.status(200).json({ status: 'ok' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

}