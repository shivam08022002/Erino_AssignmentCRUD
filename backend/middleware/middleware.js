const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateContact = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phoneNumber')
    .trim()
    .matches(/^\+?[\d\s-]{10,}$/)
    .withMessage('Valid phone number is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('jobTitle').trim().notEmpty().withMessage('Job title is required'),
];

module.exports = {handleValidationErrors, validateContact}