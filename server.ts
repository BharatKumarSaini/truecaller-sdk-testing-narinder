import express from 'express'
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');


// configure cors
app.use(cors());

// configure express to receive form data
app.use(express.json());

// configure dotEnv
dotEnv.config({path: './.env'});

const port = process.env.PORT || 5000;

// configure mongodb connection


// simple request
app.get('/', (request, response) => {
  response.send(`<h2>Welcome Narinder Sir</h2>`);
});

// router configuration
app.use('/api/users', require('./router/userRouter'));
app.listen(port, () => {
  console.log(`Express Server is started at PORT : ${port}`);
});
