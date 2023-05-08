const { check } = require('express-validator');
const validation = require('../middlewares/validateResult');

const validateReservation = [
    check('user_id')
        .notEmpty()
        .withMessage('El ID del usuario es obligatorio.'),
    check('room_id')
        .notEmpty()
        .withMessage('La sala de estudio es obligatoria.'),
    check('reservation_date')
        .notEmpty()
        .withMessage('La fecha de la reserva es obligatoria.'),
    check('start_time')
        .notEmpty()
        .withMessage('La hora de entrada es obligatoria.'),
    check('end_time')
        .notEmpty()
        .withMessage('La hora de salida es obligatoria.'),
    (req, res, next) => {
        validation(req, res, next);
    }
];


module.exports = {
    validateReservation
};