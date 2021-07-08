const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    added: {
        type: Date,
        required: true
    }
});

messageSchema
    .virtual('date')
    .get(function() {
        return this.added.toLocaleDateString(
            'en-gb',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'utc'
            }
        )
    })

module.exports = mongoose.model('Message', messageSchema)