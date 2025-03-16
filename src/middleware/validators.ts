import { body, validationResult} from "express-validator"
import { Request, Response, NextFunction } from "express" 

// Middlewares

export const validateUser = [
    body('firstname')
    .notEmpty().withMessage('Firstname is required')
    .isString().withMessage('Firstname must be a string')
    .isLength({ min: 2 }).withMessage('Username must be at least 2 characters long')
    .trim().escape(),
  body('lastname')
    .notEmpty().withMessage('Lastname is required')
    .isString().withMessage('Lastname must be a string')
    .isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters long')
    .trim().escape(),
  body('address')
    .optional({ checkFalsy: true }) //Accept empty string & null
    .isString().withMessage('Address must be a string')
    .isLength({ min: 2 }).withMessage('Address must be at least 2 characters long')
    .trim().escape(),
  body('postalCode')
    .optional({ checkFalsy: true }) //Accept empty string & null
    .isString().withMessage('Postal code must be a string')
    .isPostalCode('any').withMessage('Invalid postal code')
    .trim().escape(),
  body('city')
    .optional({ checkFalsy: true }) //Accept empty string & null
    .isString().withMessage('City must be a string')
    .isLength({ min: 2 }).withMessage('City must be at least 2 characters long')
    .trim().escape(),
  body('country')
    .optional({ checkFalsy: true }) //Accept empty string & null
    .isString().withMessage('Country must be a string')
    .isLength({ min: 2 }).withMessage('Country must be at least 2 characters long')
    .trim().escape(),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isString().withMessage('Phone must be a string')
    .isString().trim().matches(/^([\+]?[(]?[\d]{1,3}[)]?[-\s\.])?[(]?[\d]{1,3}[)]?[-\s\.][\d\-\s\.]{5,9}[\d]{1}$/).withMessage('Invalid phone number')
    .trim().escape(),
  body('dateOfBirth')
    .optional({ checkFalsy: true }) //Accept empty string & null
    .isString().withMessage('Date of Birth must be a string')
    .isISO8601().withMessage('Invalid date of birth')
    .trim().escape(),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .trim().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("Validator Error", errors);
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
]
