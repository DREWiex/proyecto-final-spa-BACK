const { Router } = require('express');
const router = Router();

const {
    getUsers,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');


// GET ALL USERS - obtener todos los usuarios en el dashboard del admin
router.get('/', getUsers);

// GET USER BY ID - obtener un usuario según su email
router.get('/:email', getUserByEmail);

// ADD USER - crear un nuevo usuario (form register / dashboard admin)
router.post('/', addUser);

// UPDATE USER - editar un usuario según su e-mail (front: mi perfil / dashboard admin)
router.put('/:email', updateUser);

//DELETE USER - eliminar un usuario según su e-mail (front: mi perfil / dashboard admin)
router.delete('/:email', deleteUser);


module.exports = router;