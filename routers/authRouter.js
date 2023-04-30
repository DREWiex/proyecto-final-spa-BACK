const { Router } = require('express');
const router = Router();

const { validateAuth } = require('../validators/auth');

const { login } = require('../controllers/authController');


// USER/ADMIN LOGIN - 
router.post('/login', validateAuth, login);


module.exports = router;