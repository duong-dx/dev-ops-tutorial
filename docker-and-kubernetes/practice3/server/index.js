const keys = require('./keys')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require('pg');

const pgClient = new Pool({
    user: keys.postgresUser,
    host: keys.postgresHost,
    database: keys.postgresDatabase,
    password: keys.postgresPassword,
    port: keys.postgresPort
})

pgClient.on('connection', function (client) {
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INTEGER)')
        .catch(err => console.error('Postgres error: ' + err));
});

// Redis client setup

const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/', (req, res) => {
    res.send('hiiiiii')
})


app.get('/values/all', async (req, res) => {
    const data = await pgClient.query('SELECT number FROM values');

    res.json(data);
})

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    const index = req.body.index

    if (parseInt(index) > 400) {
        res.status(422).send('index too high');
    }

    redisClient.hset('values', index, 'Nothing yet');
    redisPublisher.publish('insert', index);

    pgClient.query('Insert into values(number) VALUES($1)', [index]);

    res.send({working: true});
});

app.listen(process.env.SERVER_PORT, error => { console.log('Listening on port....', error); });
