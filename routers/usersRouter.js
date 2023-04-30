const { Router } = require('express');
const router = Router();

const { validateUser } = require('../validators/users');

const {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');


// GET ALL USERS - obtener todos los usuarios en el dashboard del admin
router.get('/', getUsers);

// GET USER BY ID - obtener un usuario según su email
router.get('/:id', getUserByID);

// ADD USER - crear un nuevo usuario (form register / dashboard admin)
router.post('/', validateUser, addUser);

// UPDATE USER - editar un usuario según su id (front: mi perfil / dashboard admin)
router.put('/:id', validateUser, updateUser);

//DELETE USER - eliminar un usuario según su id (front: mi perfil / dashboard admin)
router.delete('/:id', deleteUser);


module.exports = router;