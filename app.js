require('dotenv').config();

// console.log('mongo es ',process.env.MONGODB_CNN);


const Server = require('./models/server');
const server = new Server();


 server.listen();