const express = require('express');
const logger = require('./middlewares/logger');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/books', bookRoutes);

module.exports = app;