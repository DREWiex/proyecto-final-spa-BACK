const { check } = require('express-validator');
const validation = require('../middlewares/validateResult');

const validateUser = [
    check('first_name')
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    check('last_name')
        .notEmpty()
        .withMessage('El apellido es obligatorio.'),
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
    check('avatar')
        .notEmpty()
        .withMessage('La foto de perfil es obligatoria.')
        .isURL()
        .withMessage('La foto debe tener una URL válida.'),
    (req, res, next) => {
        validation(req, res, next);
    }
];


module.exports = {
    validateUser
};