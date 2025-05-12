const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const contactsId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactsId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};


const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json({error: 'Failed to create contact'});
    }
};

const updateContact = async (req, res) => {
    const contactId = ObjectId.createFromHexString(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactId}, updatedContact);
    if (response.modifiedCount > 0 || response.matchedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({error: 'Failed to update contact'});
    }
};

const deleteContact = async (req, res) => {
    const contactId = ObjectId.createFromHexString(req.params.id);

    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: contactId});

    if (response.deletedCount > 0) {
        res.status(200).json({message: 'Contact deleted successfully'});
    } else {
        res.status(500).json({error: 'Failed to delete contact'});
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact, 
    updateContact,
    deleteContact
};