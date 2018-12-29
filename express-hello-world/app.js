const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world\n')
})

app.listen(3000)