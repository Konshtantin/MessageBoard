const epxress = require('express')
const Message = require('../models/message')
const router = epxress.Router()

router.get('', (req, res) => {
    res.render('create', {title: 'Create'})
})

router.post('', (req, res) => {
    const message = new Message(Object.assign({}, req.body, {added: new Date()}))
    message.save()
        .then(result => res.redirect('/'))
})

module.exports = router