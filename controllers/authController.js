const { modelGetUserByEmail } = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');


/**
 * Verificar las credenciales del form del login comparándolas con las que están guardadas en la base de datos.
 * @function login
 * @param {Object} req Objeto de solicitud: recibe 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const login = async (req, res) => {

    /**
     * @type {Object}
     */

    const {
        email: loginEmail, // renombro la propiedad 'email' del objeto 'req.body' para diferenciarla de la propiedad que devuelve el model
        password: loginPassword // renombro la propiedad 'password' del objeto 'req.body' para diferenciarla de la propiedad que devuelve el model
    } = req.body;

    try {
        
        const { ok: emailExists, data} = await modelGetUserByEmail(loginEmail); // renombro la propiedad 'ok' del objeto que devuelve el model

        const [ { password, user_id, role } ] = data; // destructuración de las propiedades 'password', 'user_id' y 'role' del objeto del array de la propiedad 'data' que devuelve el model

        const passwordOkay = bcrypt.compareSync(loginPassword, password); // comparación del password recibido del form del login y el password guardado en la base de datos

        if(!emailExists || !passwordOkay){ // condicional: si e-mail o password es false

            return res.status(401).json({
                ok: false,
                msg: 'ERROR: e-mail o contraseña incorrectos.'
            });

        };

        const token = generateJWT(user_id, role);

        res.status(200).json({
            ok: true,
            msg: 'Credenciales correctas.',
            data, // devuelve los datos del usuario de la base de datos
            token // devuelve el token
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-LOGIN


module.exports = {
    login
};