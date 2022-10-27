import express from 'express'
import mongoose from 'mongoose'
import data from './data.js'

import Videos from './dbModel.js'

// app config
const app = express();
const port = process.env.PORT || 9000;

//middlwares
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
        res.setHeader('Access-Control-Allow-Headers', '*'),
        next()
})

// DB config
const connection_url = "mongodb+srv://admin:Poect09n6flpDosX@cluster0.6fyqcuw.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(connection_url)


// api endpoints
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/v1/posts', (req, res) => res.status(200).send(data))

app.get('/v2/posts', (req, res) => {
    Videos.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));


// Mongo DB: admin  X6cAEs6lXipNam0g