const OBSWebSocket = require('obs-websocket-js')
const express = require('express')

var app = express()
var port = process.argv[2] || 3000

app.all('/', (req, res) => {
    res.status(400).send('POST /{OBS IP:port}/SetCurrentScene/{scene name}')
})

app.post('/:ip/SetCurrentScene/:scene', (req, res) => {
    obs = new OBSWebSocket()
    obs.connect({
            address: req.params.ip,
        })
        .then(() => {
            return obs.send('SetCurrentScene', {
                'scene-name': req.params.scene,
            })
        })
        .then((data) => {
            obs.disconnect()
            console.log(`${req.params.ip} changed scene to ${req.params.scene}`)
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