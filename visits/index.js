const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server', // This is the name of the service in the docker-compose.yml file
    port: 6379 // Default port for redis
});

client.set('visits', 0);

app.get('/', (req, res) => {
    process.exit(1); // This will cause the container to crash
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 4001');
});