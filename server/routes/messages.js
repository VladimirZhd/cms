var express = require('express');
var router = express.Router();

const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');

function returnError(res, err) {
    res.status(500).json({
        message: 'An error has occurred',
        error: err
    });
}

router.get('/', (req, res, next) => {
    Message.find()
        .populate('sender')
        .then(messages => {
            res.status(200).json({
                msg: 'Messages fetched successfully!',
                messages: messages
            });
        })
        .catch(err => {
            returnError(res, err);
        });
});

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId('messages');

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save((err) => {
        if (err) {
            returnError(res, err);
        }
    });
    res.status(200).json({
        msg: 'Message saved successfully!'
    });
});



module.exports = router;