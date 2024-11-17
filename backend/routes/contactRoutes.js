const express = require('express');
const { gellAllContancs, createNewContact, updateContact, deleteContact, searchContact } = require('../controllers/contactController')
const router = express.Router();
const { handleValidationErrors, validateContact } = require('../middleware/middleware')

router.get('/', gellAllContancs);
router.post('/', validateContact, handleValidationErrors, createNewContact);
router.put('/:id', validateContact, handleValidationErrors, updateContact);
router.delete('/:id', deleteContact);
router.get('/search', searchContact);


module.exports = router;