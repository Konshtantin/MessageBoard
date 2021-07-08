const epxress = require('express')
const Message = require('../models/message')
const router = epxress.Router()

router.get('', (req, res) => {
    Message.find().sort({added: -1})
        .then(result => {
            res.render('index', {title: 'Home', messages: result})
        })
        .catch(err => console.log(err))
})

module.exports = router