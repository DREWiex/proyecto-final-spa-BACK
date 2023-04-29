const { Router } = require('express');
const router = Router();

const {
    getReservations,
    getReservationByID,
    searchReservations,
    addReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservationsController');


// GET ALL RESERVATIONS - obtener todas las reservas
router.get('/', getReservations);

// GET RESERVATION BY ID - obtener una reserva por id (vista detalle)
router.get('/:id', getReservationByID);

// SEARCH RESERVATIONS - buscar reservas por room_id (paso previo antes de 'addReservation')
router.get('/search/:id', searchReservations);

// ADD RESERVATION - crear una nueva reserva (user y admin)
router.post('/', addReservation);

// UPDATE RESERVATION - editar una reserva por id (user y admin)
router.put('/:id', updateReservation);

// DELETE RESERVATION - eliminar una reserva por id (user y admin)
router.delete('/:id', deleteReservation);


module.exports = router;