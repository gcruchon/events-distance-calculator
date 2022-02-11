import express from 'express';
import distances from '../distances.js';

const apiRouter = express.Router();

/* GET home page. */
apiRouter.post('/distances', async (req, res) => {
    const { start } = req.body;
    const response = await distances(start);
    res.send(response);
});

export default apiRouter;
