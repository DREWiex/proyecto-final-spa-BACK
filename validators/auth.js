const { check } = require('express-validator');
const validation = require('../middlewares/validateResult');

const validateAuth = [
    check('email')
        .notEmpty()
        .withMessage('El e-mail es obligatorio.')
        .isEmail()
        .withMessage('Debe introducir un e-mail válido.'),
    check('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength( { min: 6, max: 10 } )
        .withMessage('La contraseña debe tener entre 6 y 10 caracteres.'),
    (req, res, next) => {
        validation(req, res, next);
    }
];


module.exports = {
    validateAuth
};