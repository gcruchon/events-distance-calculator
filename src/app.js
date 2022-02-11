import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';

const app = express();

// Middleware
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
