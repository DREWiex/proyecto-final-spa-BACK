const { Router } = require('express');
const router = Router();

const { validateReservation } = require('../validators/reservation')

const {
    getReservations,
    getReservationByID,
    getReservationsByUserID,
    searchReservations,
    addReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservationsController');


// GET ALL RESERVATIONS - obtener todas las reservas
router.get('/', getReservations);

// GET RESERVATION BY ID - obtener una reserva por id (vista detalle)
router.get('/:id', getReservationByID);

// GET RESERVATIONS BY USER ID - obtener todas las reservas hechas por un usuario en concreto (HomePage)
router.get('/search/user/:id', getReservationsByUserID);

// SEARCH RESERVATIONS - buscar reservas por room_id (paso previo antes de 'addReservation')
router.get('/search/:id', searchReservations);

// ADD RESERVATION - crear una nueva reserva (user y admin)
router.post('/', validateReservation, addReservation);

// UPDATE RESERVATION - editar una reserva por id (user y admin)
router.put('/:id', updateReservation);

// DELETE RESERVATION - eliminar una reserva por id (user y admin)
router.delete('/:id', deleteReservation);


module.exports = router;