import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({min: 8, max:20}),
]

export const registerValidation = [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({min: 8, max:20}),
    body('fullName', 'Incorrect name').isLength({min: 4, max:20}),
]

export const postCreateValidation = [
    body('title', 'Type the title of post').isLength({min: 3}).isString(),
    body('text', 'Type the text of post').isLength({min: 3}).isString(),
    body('tags', 'Wrong format of tags').optional().isString(),
    body('imageUrl', 'Wrong link to the image').optional().isString(),
]

export const testCreateValidation = [
    body('title', 'Type the title of post').isLength({min: 3}).isString(),
    body('questionsText', 'Wrong format of test questions').isArray(),
    body('answersValues', 'Wrong format of test answers').isArray(),
    body('imageUrl', 'Wrong link to the image').optional().isArray(),
]