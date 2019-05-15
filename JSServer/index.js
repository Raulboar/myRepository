const express = require('express'); // used for creating a server
const expressConfig = require('./config/express');
const port = 4000;
const app = express();

expressConfig(app);

app.listen(port)
