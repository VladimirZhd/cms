const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    children: [{ type: Schema.Types.ObjectId, ref: 'Document' }]
});

module.exports = mongoose.model('Document', schema); 