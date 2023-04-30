const jwt = require('jsonwebtoken');

/**
 * Crear token tanto en el login como en el registro de usuarios.
 * @function
 * @param {Object} data Datos del usuario.
 * @returns {String} Token.
 * @throws Mensaje de error.
 */

const generateJWT = (data) => {

    /**
     * @type {Object}
     */

    const payload = {
        user_id: data.user_id,
        role: data.role
    };

    try {
        
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        if(token) return token;

        else throw('ERROR: no se ha generado el token.');

    } catch (error) {
        
        console.log(error);

    };

}; //!FUNC-GENERATEJWT


module.exports = generateJWT;