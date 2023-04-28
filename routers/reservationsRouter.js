const { Router } = require('express');
const router = Router();

const {
    getReservations,
    getUserReservations,
    getReservationByID,
    addReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservationsController');


// GET ALL RESERVATIONS - obtener todas las reservas
router.get('/', getReservations);

// GET ALL RESERVATIONS BY USER ID - obtener todas las reservas de un usuario
router.get('/user/:user_id', getUserReservations);

// GET RESERVATION BY ID - obtener una reserva por id (vista detalle)
router.get('/:id', getReservationByID);

// ADD RESERVATION - crear una nueva reserva (user y admin)
router.post('/', addReservation);

// UPDATE RESERVATION - editar una reserva por id (user y admin)
router.put('/:id', updateReservation);

// DELETE RESERVATION - eliminar una reserva por id (user y admin)
router.delete('/:id', deleteReservation);


module.exports = router;