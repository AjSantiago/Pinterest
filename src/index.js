const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const { format } = require('timeago.js');

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads'),
	filename: (req, file, callback) => {
		callback(null, uuid() + path.extname(file.originalname));
	},
});
app.use(multer({ storage }).single('image'));

// Global variables
app.use((req, res, next) => {
	app.locals.format = format;
	next();
});

// Routes
app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
});
