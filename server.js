require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

const userRouter = require('./routes/api/users');
const appointmentRouter = require('./routes/api/appointments');
const appointmentHistoryRouter = require('./routes/api/appointmentHistory')
const razorpayRouter = require('./routes/api/payment')
const dataRouter = require('./server/data_management/retrieve_and_ingest_data');
const ESRouter = require("./server/elasticsearch/es");

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

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
mongoose.set("strictQuery", false);

const connection = mongoose.connection;
connection.once("open", ()=>{
	console.log("MongoDb connected!!")
})

/**
 * Routes
 */

app.use('/api/users', userRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/appointmentHistory', appointmentHistoryRouter);
app.use('/api/payment', stripeRouter);


// Elasticsearch API
app.use('/ingest_data', dataRouter);
app.use('/es', ESRouter)

app.listen(PORT, function () {
  console.log('Server is running on Port: ' + PORT);
});
