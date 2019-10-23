const fs = require('fs')
const OBSWebSocket = require('obs-websocket-js')
const express = require('express')
var config = fs.existsSync('config.js') ? require('./config') : {}

var app = express()
var port = process.argv[2] || config.port || 3000

app.all('/', (req, res) => {
    res.status(400).send('POST /{OBS IP:port}/SetCurrentScene/{scene name}')
})

app.all('/:server/SetCurrentScene/:scene', (req, res) => {
    let server_ip = config.servers[req.params.server] || req.params.server

    obs = new OBSWebSocket()
    obs.connect({
            address: server_ip,
        })
        .then(() => {
            return obs.send('SetCurrentScene', {
                'scene-name': req.params.scene,
            })
        })
        .then((data) => {
            obs.disconnect()
            console.log(`${req.params.server} changed scene to ${req.params.scene}`)
            res.send(data)
        })
        .catch((err) => {
            obs.disconnect()
            console.log(err)
            res.status(500).send(err)
        })
})

app.listen(port, () => {
    console.log(`OBS-API listening on port ${port}`)
})