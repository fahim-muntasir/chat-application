// external import
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const io = new Server(server);

global.io =io;
//internal import
const routers = require('./server/routers/router');
const connect_DB = require('./server/database/connection');

dotenv.config({path:'.env'});

//morgan setup
app.use(morgan('tiny'));
//cookie-parser setup
app.use(cookieParser(process.env.COOKIE_SECRET));

//body-perser setrup
app.use(bodyParser.urlencoded({urlencoded:true}));
app.use(bodyParser.json())

//view engine setup
app.set('view engine', 'ejs');

//database connection
connect_DB();

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/uploads', express.static(path.resolve(__dirname, 'assets/uploads')));

//router setup
app.use('/', routers);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server is on http://localhost:${PORT}`));