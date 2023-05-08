const { check } = require('express-validator');
const validation = require('../middlewares/validateResult');

const validateRoom = [
    check('room')
        .notEmpty()
        .withMessage('El nombre de la sala de estudio es obligatorio.'),
    check('description')
        .notEmpty()
        .withMessage('El apellido es obligatorio.')
        .isLength( { min: 20 } )
        .withMessage('La descripción debe tener al menos 20 caracteres.'),
    check('photo')
        .notEmpty()
        .withMessage('La foto es obligatoria.')
        .isURL()
        .withMessage('La foto debe tener una URL válida.'),
    (req, res, next) => {
        validation(req, res, next);
    }
];


module.exports = {
    validateRoom
};