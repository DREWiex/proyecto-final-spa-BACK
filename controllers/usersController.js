const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');

const {
    modelGetUsers,
    modelGetUserByID,
    modelAddUser,
    modelUpdateUser,
    modelDeleteUser,
    modelGetUserByEmail
} = require('../models/usersModel');


/**
 * Obtener todos los usuarios de la base de datos.
 * @function getUsers
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getUsers = async (req, res) => {

    try {

        const { ok, data } = await modelGetUsers(); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, no existen usuarios en la base de datos

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no hay usuarios registrados en la base de datos.'
            });

        } else {

            res.status(200).json({
                ok: true,
                data  // devuelve un array de objetos con las propiedades del objeto que contiene los datos de los usuarios
            });

        };

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-GETUSERS


/**
 * Obtener por ID un usuario de la base de datos.
 * @function getUserByID
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getUserByID = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' del usuario ('user_id') recibido en el objeto 'req.params'

    try {

        const { ok, data } = await modelGetUserByID(id); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, el usuario no existe

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe ningún usuario con el ID "${id}" en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data // devuelve un objeto con los datos del usuario
            });

        };

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-GETUSERBYEMAIL


/**
 * Crear un usuario en la base de datos.
 * @function addUser
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const addUser = async (req, res) => {

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto 'req.body'

    // encriptar password
    let salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    /**
     * Contiene los datos del nuevo usuario que se guardarán en la base de datos.
     * @type {Object}
     */

    const newData = {
        role_id: req.body.role_id || 2, // si no se especifica (registro –índex–), el valor por defecto será 2 ('user'); esto es porque el admin desde su dashboard sí tendrá la opción de elegir el role
        ...req.body // recibe el objeto body del form de registro o del dashboard del admin
    };

    try {

        //* VALIDACIÓN 1: INPUT ERRORS

        if(res.errors){ // condicional: validación de errores en los inputs del form

            return res.status(400).json({
                ok: false,
                errors: res.errors // devuelve un objeto con los errores
            });

        };

        //* VALIDACIÓN 2: E-MAIL

        const emailExists = await modelGetUserByEmail(email);

        if(emailExists.ok){ // condicional: si el e-mail existe

            return res.status(401).json({
                ok: false,
                msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
            });

        };

        //* CREAR/REGISTRAR USUARIO

        await modelAddUser(newData); // crear/registrar un nuevo usuario en la base de datos

        // obtengo los datos del nuevo usuario para pasarlos como argumento a la función que genera el token
        const { data } = await modelGetUserByEmail(email); // destructuración de la propiedad 'data' del objeto que devuelve el model

        const token = generateJWT(data); // generar token

        res.status(201).json({
            ok: true,
            msg: 'El usuario se ha registrado con éxito.',
            data,  // devuelve los datos del usuario ya registrados en la base de datos
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-ADDUSER


/**
 * Actualizar/editar por ID un usuario en la base de datos.
 * @function updateUser
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params' y 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const updateUser = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' del usuario ('user_id') recibido en el objeto 'req.params'

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto 'req.body'

    // encriptar password
    let salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    /**
     * Contiene los datos editados del usuario que se actualizarán en la base de datos.
     * @type {Object}
     */

    const newData = {
        user_id: id, // renombro la propiedad para que coincida con el model
        role_id: req.body.role_id || 2, // si no se especifica (form 'Mi perfil' –user–), el valor por defecto será 2 ('user'); esto es porque el admin desde su dashboard sí tendrá la opción de modificar el role
        ...req.body // spread de todas las propiedades que recibe el objeto 'req.body' del form desde la página 'Mi perfil' (–user–) o desde el dashboard del admin
    };

    try {

        //! VALIDACIÓN 1: ID

        const { ok } = await modelGetUserByID(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, el usuario no existe

            return res.status(400).json({
                ok: false,
                msg: `ERROR: no existe ningún usuario con el ID "${id}" en la base de datos.`
            });

        };


        //! VALIDACIÓN 2: INPUT ERRORS

        if(res.errors){

            return res.status(400).json({
                ok: false,
                errors: res.errors // devuelve un objeto con los errores
            });

        };


        //! VALIDACIÓN 3: E-MAIL

        const { ok: emailExists, data } = await modelGetUserByEmail(email); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model
        // renombro la propiedad 'ok' para facilitar interpretación del condicional

        if(emailExists){ // condicional: si el e-mail existe, se pueden dar dos casos:

            const { user_id } = data; // destructuración de la propiedad 'user_id' del objeto 'data'

            // 'user_id', propiedad que devuelve el model; 'id', propiedad recibida en el objeto 'req.params' (usuario actual)
            if(user_id == id){ // caso 1: el e-mail y el 'user_id' coinciden con el mismo usuario en la base de datos, es decir, corresponde al usuario que está actualizando sus datos

                await modelUpdateUser(newData); // actualizar datos del usuario

                // obtengo los datos actualizados del usuario para pasarlos como argumento a la función que genera el token
                const { data: updatedData } = await modelGetUserByEmail(email);  // destructuración de la propiedad 'data' del objeto que devuelve el model
                // renombro la propiedad 'data' para facilitar la interpretación y evitar posibles conflictos (propiedad 'data' del model –línea 222–)

                const token = generateJWT(updatedData); // generar token

                res.status(200).json({
                    ok: true,
                    msg: 'Usuario actualizado con éxito.',
                    updatedData, // devuelve los datos del usuario ya actualizados en la base de datos
                    token
                });

            } else { // caso 2: el e-mail ya está registrado en la base de datos con otro 'user_id'

                res.status(400).json({
                    ok: false,
                    msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
                });

            };

        } else { // condicional: el e-mail no existe en la base de datos y, por ende, se actualiza el usuario

            await modelUpdateUser(newData); // actualizar datos del usuario

            // obtengo los datos actualizados del usuario para pasarlos como argumento a la función que genera el token
            const { data: updatedData } = await modelGetUserByEmail(email);  // destructuración de la propiedad 'data' del objeto que devuelve el model
            // renombro la propiedad 'data' para facilitar la interpretación y evitar posibles conflictos            

            const token = generateJWT(updatedData); // generar token

            res.status(200).json({
                ok: true,
                msg: 'Usuario actualizado con éxito.',
                updatedData, // devuelve los datos del usuario ya actualizados en la base de datos
                token
            });

        };

    } catch (error) {

        console.log(error.detail);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-UPDATEUSER


/**
 * Eliminar por ID un usuario de la base de datos
 * @function deleteUser
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const deleteUser = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' del usuario ('user_id') recibido en el objeto 'req.params'

    try {

        const { ok } = await modelGetUserByID(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si es false, el usuario no existe en la base de datos

            res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID "${id}" no existe en la base de datos.`
            });

        } else {

            await modelDeleteUser(id);

            res.status(200).json({
                ok: true,
                msg: 'El usuario ha sido eliminado correctamente.'
            });

        };

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-DELETEUSER


module.exports = {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser
};