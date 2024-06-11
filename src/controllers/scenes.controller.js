import {pool} from '../db.js';

export const getUserScenes = async (req, res) => {
    try {
        //Obtener el id del usuario
        const [rows] = await pool.query("SELECT id FROM users WHERE name = ?", [req.session.user]);
        const userId = rows[0].id;

        //Obtener las escenas del usuario
        const [scenes] = await pool.query("SELECT scenes.id, scenes.name, scenes.content FROM scenes INNER JOIN creates ON scenes.id = creates.sceneId WHERE creates.userId = ?", [userId]);
        res.status(200).json({ status: 'ok', scenes: scenes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

export const saveScene = async (req, res) => {
    try {
        //Obtener el id del usuario
        const [rows] = await pool.query("SELECT id FROM users WHERE name = ?", [req.session.user]);
        const userId = rows[0].id;
        console.log(userId);
        //Guardar la escena y obtener su id
        const {scene} = req.body;
        const [sceneRows] = await pool.query("INSERT INTO scenes (name, content) VALUES (?,?)", ["new scene", scene]);
        const sceneId = sceneRows.insertId;
        console.log(sceneId);
    
        //Guardar el id de la escena y el id del usuario en creates
        await pool.query("INSERT INTO creates (userId, sceneId) VALUES (?, ?)", [userId, sceneId]);

        res.status(200).json({ status: 'ok' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

}

export const getScene = async (req, res) => {

}