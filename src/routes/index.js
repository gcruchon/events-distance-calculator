import express from 'express';

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res) => {
    res.send(`Hello World (${req.app.get('env')})`);
});

export default indexRouter;
