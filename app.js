const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const indexRouter = require('./routers/index')
const createRouter = require('./routers/create')
const compression = require('compression')
const helmet = require('helmet')
const favicon = require('serve-favicon')

const app = express()

app.use(helmet())
const port = process.env.PORT || 3000
const MongoURI = 'mongodb+srv://Konzay:KY1jNageB7@messages.fsayb.mongodb.net/messages?retryWrites=true&w=majority'
const dbURI = process.env.MONGODB_URI || MongoURI
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch(err => console.log(err))

app.use(logger('dev'))

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.urlencoded({extended: true}))

app.use(compression())

app.use(express.static('./public'))

app.use('/', indexRouter)
app.use('/new', createRouter)

app.use((req, res) =>{
    res.status(404).render('404', {title: 'Not Found'})
})
