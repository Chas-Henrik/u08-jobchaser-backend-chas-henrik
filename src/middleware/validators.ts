import { body, validationResult} from "express-validator"
import { Request, Response, NextFunction } from "express" 

// Middlewares

export const validateUser = [
    body('firstname')
    .notEmpty().withMessage('Firstname is required')
    .isString().withMessage('Firstname must be a string')
    .trim().isLength({ min: 2 }).withMessage('Username must be at least 2 characters long'),
  body('lastname')
    .notEmpty().withMessage('Lastname is required')
    .isString().withMessage('Lastname must be a string')
    .trim().isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters long'),
  body('address')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Address must be a string')
    .trim().isLength({ min: 2 }).withMessage('Address must be at least 2 characters long'),
  body('postalCode')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Postal code must be a string')
    .trim().isPostalCode('any').withMessage('Invalid postal code'),
  body('city')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('City must be a string')
    .trim().isLength({ min: 2 }).withMessage('City must be at least 2 characters long'),
  body('country')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Country must be a string')
    .trim().isLength({ min: 2 }).withMessage('Country must be at least 2 characters long'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isString().withMessage('Phone must be a string')
    .trim().isString().matches(/^([\+]?[(]?[\d]{1,3}[)]?[-\s\.])?[(]?[\d]{1,3}[)]?[-\s\.][\d\-\s\.]{5,9}[\d]{1}$/).withMessage('Invalid phone number'),
  body('dateOfBirth')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Date of Birth must be a string')
    .trim().isISO8601().withMessage('Invalid date of birth'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .trim().isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Validator Error", errors);
      res.status(400).json({ message: "Invalid user data", errors: errors.array() });
      return;
    }
    next();
  }
]

export const validateFavorite = [
  body('id')
    .notEmpty().withMessage('Id is required')
    .isString().withMessage('Id must be a string')
    .trim().isLength({ min: 1 }).withMessage('Id must be at least 1 characters long'),
  body('employer')
    .notEmpty().withMessage('Employer is required')
    .isString().withMessage('Employer must be a string')
    .trim().isLength({ min: 1 }).withMessage('Employer must be at least 1 characters long'),
  body('logo_url')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Logo URL must be a string')
    .trim().isURL().withMessage('Invalid Logo URL'),
  body('headline')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Headline must be a string')
    .trim().isLength({ min: 2 }).withMessage('Headline must be at least 2 characters long'),
  body('position')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Position must be a string')
    .trim().isLength({ min: 2 }).withMessage('Position must be at least 2 characters long'),
  body('role')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Role must be a string')
    .trim().isLength({ min: 2 }).withMessage('Role must be at least 2 characters long'),
  body('posted')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .trim().isISO8601().withMessage('posted must be a Date'),
  body('expires')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .trim().isISO8601().withMessage('Expires must be a Date'),
  body('contract')
    .notEmpty().withMessage('Contract is required')
    .isString().withMessage('Contract must be a string')
    .trim().isLength({ min: 1 }).withMessage('Contract must be at least 1 characters long'),
  body('city')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('City must be a string')
    .trim().isLength({ min: 2 }).withMessage('City must be at least 2 characters long'),
  body('region')
    .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Region must be a string')
    .trim().isLength({ min: 2 }).withMessage('Region must be at least 2 characters long'),
  body('country')
  .optional({ values: 'falsy' }) //Accept undefined, null & empty string
    .isString().withMessage('Country must be a string')
    .trim().isLength({ min: 2 }).withMessage('Country must be at least 2 characters long'),
  body('url')
    .notEmpty().withMessage('URL is required')
    .isString().withMessage('URL must be a string')
    .trim().isURL().withMessage('Invalid URL'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Validator Error", errors);
      res.status(400).json({ message: "Invalid favorite data", errors: errors.array() });
      return;
    }
    next();
  }
]
