const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');

const Contact = require('../models/contact');
const { response } = require('express');

function returnError(res, err) {
    res.status(500).json({
        message: 'An error has occurred',
        error: err
    });
}

router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res
                .status(200)
                .json({
                    message: 'Contacts fetched successfully!',
                    contacts: contacts
                });
        })
        .catch(err => {
            returnError(res, err);
        });
});

router.get('/:id', (req, res, next) => {
    Contact.findOne({
        "id": req.params.id
    })
        .populate('group')
        .then(contact => {
            res.status(200).json({
                message: 'Contact fetched successfully!',
                contact: contact
            });
        })
        .catch(err => {
            returnError(res, err);
        });
})

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId('contacts');

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        url: req.body.url,
        group: req.body.group
    });

    contact.save((err) => {
        if (err) {
            return res.status(500).json({
                title: 'An error has occurred',
                error: err
            })
        }
    });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id }, (err, contact) => {
        if (err || !contact) {
            return res.status(500).json({
                title: "No Contact Found",
                error: { contact: 'Contact not found' }
            });
        }

        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;

        if (contact.group && contact.group.length > 0) {
            for (let groupContact of contact.group) {
                groupContact = groupContact._id;
            }
        }

        contact.save((err) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error has occurred',
                    error: err
                })
            }
        });
    });
    res.status(201).json({
        msg: 'Contact updated successfully!'
    });
})

router.delete('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(() => {
            Contact.deleteOne({ id: req.params.id })
                .then((contact) => {
                    res.status(204).json({
                        message: 'Contact deleted successfully!'
                    })
                        .catch(err => {
                            returnError(res, err);
                        })
                })
        })
        .then(err => {
            returnError(res, err);
        });
})

module.exports = router;