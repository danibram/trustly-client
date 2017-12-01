const express = require('express')
const bodyParser = require('body-parser')
const util = require('util')
const app = express()
const client = require('../build/main/index.js').default

const app = express()

const tClient = client({
    username: 'Your_trustly_username',
    password: 'Your_trustly_password',
    privateKeyPath: 'Path/to/your/private/pem/file'
})

const port = process.env.PORT || 4343

app.use(bodyParser.raw())
app.use(bodyParser.json())

/* serves main page */
app.post('/notification', function(req, res) {
    console.log('- Notification is comming. √')
    tClient
        .prepareNotificationResponse(req.body)
        .then(function(data) {
            console.log(util.inspect(data, false, 20, true))
            res.send(data)
        })
        .catch(function(error) {
            console.log('_Error')
            console.log(util.inspect(error, false, 20, true))
        })
})

app.get('/success', function(req, res) {
    console.log('- Success payment was arrive.')
    res.send('OK')
})

/* serves all the static files */
app.get('/fail', function(req, res) {
    console.log('- Failed payment was arrive.')
    res.send('OK')
})

app.listen(port, function() {
    console.log('**********************************************')
    console.log('* Trustly Server Tester                      *')
    console.log('*         >> Listening on 127.0.0.1:' + port + '     *')
    console.log('**********************************************')
})
