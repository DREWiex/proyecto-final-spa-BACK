const { Router } = require('express');
const router = Router();

const {
    getRooms,
    getRoomByID,
    addRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/roomsController');


// GET ALL ROOMS - obtener todas las salas de estudio
router.get('/', getRooms);

// GET ROOM BY ID - obtener una sala por id para la vista detalle
router.get('/:id', getRoomByID);

// ADD ROOM - crear una nueva sala de estudio (dashboard - admin)
router.post('/', addRoom);

// UPDATE ROOM - editar una sala de estudio por id (dashboard - admin)
router.put('/:id', updateRoom);

// DELETE ROOM - eliminar una sala de estudio por id (dashboard - admin)
router.delete('/:id', deleteRoom);


module.exports = router;