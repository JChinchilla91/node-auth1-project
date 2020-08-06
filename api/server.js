const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('../users/user-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
    name: 'yowhaddup',
    secret: 'What do I put here?',
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require('../database/connection.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createTable: true,
        clearInterval: 1000 * 45
    })
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: 'wow wow wow' });
});

module.exports = server;