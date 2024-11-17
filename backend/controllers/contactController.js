const asyncHandler = require('express-async-handler');
const Contact = require('../model/contactModel')

const gellAllContancs = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sortField || 'createdAt';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        const contacts = await Contact.find()
            .sort({ [sortField]: sortOrder })
            .skip(page * limit)
            .limit(limit);

        const total = await Contact.countDocuments();

        res.json({
            contacts,
            total,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching contacts' });
    }
})

const createNewContact = asyncHandler(
    async (req, res) => {
        try {
            const contact = new Contact(req.body);
            await contact.save();
            res.status(201).json(contact);
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({ error: 'Email already exists' });
            } else {
                res.status(500).json({ error: 'Error creating contact' });
            }
        }
    }
)

const updateContact = asyncHandler(
    async (req, res) => {
        try {
            const contact = await Contact.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!contact) {
                return res.status(404).json({ error: 'Contact not found' });
            }

            res.json(contact);
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({ error: 'Email already exists' });
            } else {
                res.status(500).json({ error: 'Error updating contact' });
            }
        }
    }
)

const deleteContact = asyncHandler(
    async (req, res) => {
        try {
            const contact = await Contact.findByIdAndDelete(req.params.id);
            console.log(req.params.id)

            if (!contact) {
                return res.status(404).json({ error: 'Contact not found' });
            }

            res.json({ message: 'Contact deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error deleting contact' });
        }
    }
)

const searchContact = asyncHandler(
    async (req, res) => {
        try {
            const { query } = req.query;
            const searchRegex = new RegExp(query, 'i');

            const contacts = await Contact.find({
                $or: [
                    { firstName: searchRegex },
                    { lastName: searchRegex },
                    { email: searchRegex },
                    { company: searchRegex }
                ]
            });

            res.json(contacts);
        } catch (err) {
            res.status(500).json({ error: 'Error searching contacts' });
        }
    }
)

module.exports = { gellAllContancs, createNewContact, updateContact, deleteContact, searchContact };

