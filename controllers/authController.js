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

        //! VALIDACIÓN 1: INPUT ERRORS

        if(res.errors){

            return res.status(400).json({
                ok: false,
                errors: res.errors // devuelve un objeto con los errores
            });

        };


        //! VALIDACIÓN 2: CREDENCIALES
        
        const { ok: emailExists, data } = await modelGetUserByEmail(loginEmail); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model
        // renombro la propiedad 'ok' para facilitar interpretación del condicional

        if(!emailExists){ // condicional: si el e-mail no existe en la base de datos

            return res.status(401).json({
                ok: false,
                msg: 'ERROR: e-mail o contraseña incorrectos.'
            });

        };

        const { password } = data; // destructuración de la propiedad 'password' del objeto 'data' (model)

        const passwordOkay = bcrypt.compareSync(loginPassword, password); // comparación del password recibido del form del login y el password guardado en la base de datos

        if(!passwordOkay){ // condicional: si 'loginPassword' no coincide con el password del e-mail registrado en la base de datos ('loginEmail')

            return res.status(401).json({
                ok: false,
                msg: 'ERROR: e-mail o contraseña incorrectos.'
            });

        }

        const token = generateJWT(data); // generar token

        res.status(200).json({
            ok: true,
            msg: 'Credenciales correctas.',
            data, // devuelve un objeto con los datos del usuario que están guardados en la base de datos
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