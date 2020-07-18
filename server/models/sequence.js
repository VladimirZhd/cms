const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    maxContactId: { type: Number },
    maxMessageId: { type: Number },
    maxDocumentId: { type: Number }
});

module.exports = mongoose.model('Sequence', schema);