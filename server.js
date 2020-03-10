console.log("Starting Server...");
const express = require('express');
const app = express();

// Looks for index.js in the controllers folder (similar to __init__ with Python)
app.use(require('./controllers'))

const port = process.env.PORT || 3001;

app.listen(port);

console.log("Express is running on port: " + port);
