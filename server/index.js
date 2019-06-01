const mongoose = require('mongoose');
const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const redis = require('redis');

mongoose.connect(keys.dbAdd, {
    // auth: {
    //     user: keys.mongoUsername,
    //     password: keys.mongoPassword
    // },
    useNewUrlParser: true
});
mongoose.connection.on('error', () => {
    console.log('mongoose is disconnected')
});
const DB = mongoose.model('FB_REDIS', new mongoose.Schema({
    value: String
}))
app.use(cors());
app.use(bodyParser.json());

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
    res.send('Hi')
})

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        console.log(values)
        res.send(values);
    })
})
app.get('/values/all', async (req, res) => {
    const values = await DB.find({})
    res.send(values);
});
app.post('/values', async (req, res) => {
    const index = req.body.index;

    if ( +index > 40 ) {
        return res.status(422).send('Index too high')
    }
    redisClient.hset('values', index, 'Nothing yet!');
    await redisPublisher.publish('insert', index);
    const value = new DB({ value: index })
    value.save()
    res.send({ working: true })

})

app.listen(5000, () => {
    console.log('server is running on port 5000')
})