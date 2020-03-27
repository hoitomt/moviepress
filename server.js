const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// Looks for index.js in the controllers folder (similar to __init__ with Python)
app.use(require('./controllers'))

const port = process.env.PORT || 3001;

app.listen(port);

console.log("Express is running on port: " + port);
