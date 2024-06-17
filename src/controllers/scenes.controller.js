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
        console.log(req.body);
        if(req.body.id){
            await pool.query("UPDATE scenes SET content = ? WHERE id = ?", [req.body.scene, req.body.id]);
            res.status(200).json({ status: 'ok' });
            return;
        }
        else{
            const [rows] = await pool.query("SELECT id FROM users WHERE name = ?", [req.session.user]);
            const userId = rows[0].id;
    
            const {scene} = req.body;
            const [sceneRows] = await pool.query("INSERT INTO scenes (name, content) VALUES (?,?)", ["new scene", scene]);
            const sceneId = sceneRows.insertId;
    
            await pool.query("INSERT INTO creates (userId, sceneId) VALUES (?, ?)", [userId, sceneId]);
    
            res.status(200).json({ status: 'ok' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }

}

export const deleteScene = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }
        const sceneId = req.body.id;
        console.log(sceneId);

        await pool.query("DELETE FROM scenes WHERE id = ?", [sceneId]);

        await pool.query("DELETE FROM creates WHERE sceneId = ?", [sceneId]);

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}

export const updateSceneName = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const sceneId = req.body.id;
        const sceneName = req.body.name;

        await pool.query("UPDATE scenes SET name = ? WHERE id = ?", [sceneName, sceneId]);

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}