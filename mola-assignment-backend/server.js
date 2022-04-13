const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

/**
 * connect to mongoDB using mongoose
 */
 const dburi = process.env.ATLAS_URI
 mongoose.connect(dburi, {useNewUrlParser: true});
 const connection = mongoose.connection;
 connection.once('open', ()=>{
     console.log("MongoDB database connection established")
 });

/**
 * config routers
 */
const questionsRouter = require('./routers/questions');
const submissionsRouter = require('./routers/submissions');
app.use('/questions', questionsRouter);
app.use('/submissions', submissionsRouter);

/**
 * start the server
 */
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});