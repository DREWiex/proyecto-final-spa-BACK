const jwt = require('jsonwebtoken');

/**
 * Crear token tanto en el login como en el registro de usuarios.
 * @function
 * @param {Number} user_id ID del usuario
 * @param {String} name Nombre del usuario
 * @returns {String} Token
 * @throws Mensaje de error
 */

const generateJWT = (user_id, name) => {

    const payload = {
        user_id,
        name
    };

    try {
        
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '5m' }
        );

        if(token) return token;

        else throw('ERROR: no se ha generado el token.');

    } catch (error) {
        
        console.log(error);

    };

}; //!FUNC-GENERATEJWT


module.exports = generateJWT;