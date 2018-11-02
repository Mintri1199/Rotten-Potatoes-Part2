const app = require('express')()

app.get('/', (req, res) => {
    res.render('movies-index')
})


module.exports = app
