const { Router } = require('express');
const router = Router();

const { login } = require('../controllers/authController');


// USER/ADMIN LOGIN - 
router.post('/login', login);


module.exports = router;