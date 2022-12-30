require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/api/users');
const availabilityRouter = require('./routes/api/availability');
const appointmentRouter = require('./routes/api/appointments');
const adminRouter = require('./routes/api/admin');

const PORT = process.env.PORT;

/**
 * Intial App Configuration
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); // adding Helmet to enhance your Rest API's security
app.use(bodyParser.json()); // using bodyParser to parse JSON bodies into JS objects
app.use(cors()); // enabling CORS for all requests
app.use(morgan('combined')); // adding morgan to log HTTP requests

/**
 * Database Configuration
 */

const db_uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
mongoose.connect(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once('open', () => {
  console.log('MongoDb connected!!');
});

/**
 * Routes
 */

app.use('/api/users', userRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, function () {
  console.log('Server is running on Port: ' + PORT);
});
