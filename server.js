const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth.js');

if (process.env.NODE_ENV !== 'production') {
  require('./env.js');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth.checkCookie);

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(express.static('./assets'));

// Looks for index.js in the controllers folder (similar to __init__ with Python)
app.use(require('./controllers'))

const port = process.env.PORT || 3001;

app.listen(port);

console.log("Express is running on port: " + port);
