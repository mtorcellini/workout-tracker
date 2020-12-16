const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const PORT = 3000;

const app = express();
app.use(logger("dev")); // use morgan for logging
app.use(express.static("public")); // serve public folder

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});






