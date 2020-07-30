const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');

const app = express();

app.use(cors({
    origin: '*'
}));

// Connect to the database
require('./config/db');

app.set('trust proxy', true);

const userRouter = require('./router');
const adminRouter = require('./admin/admin');

// App Setup
app.use(morgan('combined')); // Middleware to log out requests
app.use(bodyParser.json()); // Middleware to ???
app.use(userRouter);
app.use(adminRouter);

// Server Setup
const PORT = 5001;
const server = http.createServer(app); // library for working with http requests.

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});