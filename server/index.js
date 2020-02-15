const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
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