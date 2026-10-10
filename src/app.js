const express = require('express');
const logger = require('./middlewares/logger');
const bookRoutes = require('./routes/bookRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/books', bookRoutes);
app.use('/reports', reportRoutes);

module.exports = app;