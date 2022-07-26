const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})

client.set('visits', 0)
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Numberrrr of visits' + visits);

        client.set('visits', parseInt(visits) + 1)
    });
    
})

app.get('/hello', (req, res) => {
    res.send('helloooooo');
})

app.listen('8080', (req, res) => {
    console.log('Server running at http://127.0.0.1:' + '8080');
});