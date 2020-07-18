const express = require('express');
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');
const contact = require('../models/contact');

const router = express.Router();

function returnError(res, err) {
    res.status(500).json({
        message: 'An error has occurred',
        error: err
    });
}

router.get('/', (req, res, next) => {
    Document.find()
        .then(documents => {
            res
                .status(200)
                .json({
                    message: 'Documents fetched successfully!',
                    documents: documents
                });
        })
        .catch(err => {
            returnError(res, err);
        })
    next();
});

router.get('/:id', (req, res, next) => {
    Document.findOne({
        "id": req.params.id
    })
        .populate()
        .then(document => {
            res
                .status(200)
                .json({
                    message: 'Document fetched successfully!',
                    document: document
                });
        })
        .catch(err => {
            res.status(500).json({
                message: 'An error has occurred',
                error: err
            });
        })
    next();
});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId('documents');

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        children: req.body.children
    });
    document.save().then(createdDocument => {
        res.status(201).json({
            message: 'Document was added',
            document: createdDocument
        });
    }).catch(err => {
        res.status(500).json({
            message: 'An error has occurred',
            error: err
        });
    });
});

router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id }, (err, document) => {
        if (err || !document) {
            return res.status(500).json({
                title: 'No Document Found',
                error: { document: 'Document not found' }
            });
        }

        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;

        document.save((err) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error has occurred',
                    error: err
                })
            }
        })
    })
});

router.delete('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(() => {
            Document.deleteOne({ id: req.params.id })
                .then((document) => {
                    res.status(204).json({
                        message: 'Document deleted successfully!'
                    })
                })
                .catch(err => {
                    returnError(res, err);
                })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Document not found',
                error: { document: 'Document not found' }
            })
        })
});


module.exports = router;

