require('dotenv/config');

const PORT = process.env.PORT || 3003

const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const queryParser = require('express-query-int')
const allowCors = require('./config/cors')


const app = express();

app.use(cors({
  origin: '*'
}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)
app.use(queryParser())
app.use(routes);


app.listen(PORT, function() {
    console.log(`BACKEND is running on port ${PORT}`)
})




