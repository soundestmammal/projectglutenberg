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

const router = require('./router');

// App Setup
app.use(morgan('combined')); // Middleware to log out requests
app.use(bodyParser.json({ type: '*/*' })); // Middleware to ???
router(app);

// Server Setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app); // library for working with http requests.

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});