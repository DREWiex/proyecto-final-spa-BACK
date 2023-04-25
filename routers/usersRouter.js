const { Router } = require('express');
const router = Router();


// GET ALL USERS - obtener todos los usuarios en el dashboard del admin
router.get('/');

// GET USER BY ID - obtener un usuario según su email
router.get('/:email');

// ADD USER - crear un nuevo usuario (form register / dashboard admin)
router.post('/');

// UPDATE USER - editar un usuario según su e-mail (front: mi perfil / dashboard admin)
router.put('/:email');

//DELETE USER - eliminar un usuario según su e-mail (front: mi perfil / dashboard admin)
router.delete('/:email');


module.exports = router;