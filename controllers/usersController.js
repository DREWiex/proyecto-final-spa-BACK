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

        const { ok, result } = await modelGetUsers(); // destructuración de las propiedades 'ok' y 'result' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, es por un error y entra en el catch del model

            return res.status(400).json({
                ok: false,
                msg: 'ERROR: no se han podido obtener resultados.'
            });

        };

        const { rowCount, rows } = result; // destructuración de las propiedades 'rowCount' y 'rows' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, no existen usuarios en la base de datos

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no existen usuarios en la base de datos.'
            });

        } else {

            res.status(200).json({
                ok: true,
                data: rows  // devuelve un array de objetos con las propiedades del objeto que contiene los datos de los usuarios
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

    const { id } = req.params; // destructuración del 'id' del usuario ('user_id') recibido en el objeto req.params

    try {

        const { ok, result } = await modelGetUserByID(id); // destructuración de las propiedades 'ok' y 'result' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, es por un error y entra en el catch del model

            return res.status(400).json({
                ok: false,
                msg: 'ERROR: no se han podido obtener resultados.'
            });

        };

        const { rowCount, rows } = result; // destructuración de las propiedades 'rowCount' y 'rows' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, no existe el usuario en la base de datos

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe ningún usuario con el ID "${id}" en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data: rows // devuelve un array con el objeto que contiene los datos del usuario
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

    /**
     * @type {Object}
     */

    const data = {
        role_id: 2, // el valor por defecto será 2 ('user') (1 = 'admin')
        ...req.body // recibe el objeto body del form de registro o del dashboard del admin
    };

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto 'req.body'

    try {

        const { result } = await modelGetUserByEmail(email); // destructuración de la propiedad 'result' del objeto que devuelve el model

        const { rowCount } = result; // destructuración de la propiedad 'rowCount' del objeto 'result'

        if (rowCount == 1) { // condicional: si rowCount es igual a 1, el e-mail ya existe

            return res.status(400).json({
                ok: false,
                msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
            });

        };

        const { ok } = await modelAddUser(data); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no se ha registrado el usuario.'
            });

        } else {

            res.status(201).json({
                ok: true,
                msg: 'El usuario se ha registrado con éxito.',
                data // devuelve los datos recibidos del form de registro o del dashboard admin más el 'role_id' que, por defecto, será 2 ('user')
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

    const data = {
        user_id: id, // renombro la propiedad para que coincida con el model
        ...req.body // spread de todas las propiedades que recibe el objeto 'req.body' del form desde la página 'Mi perfil' (–user–) o desde el dashboard del admin
    };

    try {

        const { result } = await modelGetUserByEmail(email); // destructuración de la propiedad 'result' del objeto que devuelve el model

        const { rowCount, rows } = result; // destructuración de la propiedad 'rowCount' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, el e-mail no existe en la base de datos

            const { ok } = await modelUpdateUser(data); // destructuración de la propiedad 'ok' del objeto que devuelve el model

            if(!ok){ // condicional: si 'ok' es false, es por un error y entra en el catch del model

                return res.status(400).json({
                    ok: false,
                    msg: 'ERROR: no se guardaron los cambios realizados.'
                });

            } else {

                return res.status(200).json({
                    ok: true,
                    msg: 'Usuario actualizado con éxito',
                    data // devuelve los datos recibidos del form desde la página 'Mi perfil' (–user–) o desde el dashboard del admin más el 'user_id' recibido por params
                });

            };

        }; //! FIRST-IF-END


        if(rowCount == 1){ // condicional: si 'rowCount' es igual a 1, el e-mail existe en la base de datos y se pueden dar dos casos:

            const [ { user_id } ] = rows; // destructuración de la propiedad 'user_id' del array de objetos de la propiedad 'rows' que devuelve el objeto de la respuesta del 'modelGetUserByEmail'

            if(user_id == id){ // si 'user_id' (recibido en 'modelGetUserByEmail') coincide con el 'id' (recibido por params –usuario actual–), el usuario se actualiza porque el e-mail está guardado en la base de datos con su 'user_id'

                const { ok } = await modelUpdateUser(data);  // destructuración de la propiedad 'ok' del objeto que devuelve el model

                if(!ok){ // condicional: si 'ok' es false, es por un error y entra en el catch del model

                    return res.status(400).json({
                        ok: false,
                        msg: 'ERROR: no se guardaron los cambios realizados.'
                    });

                } else {

                    return res.status(200).json({
                        ok: true,
                        msg: 'Usuario actualizado con éxito',
                        data // devuelve los datos recibidos del form desde la página 'Mi perfil' (–user–) o desde el dashboard del admin más el 'user_id' recibido por params
                    });

                };

            } else { // el e-mail está registrado con un 'user_id' distinto al del usuario actual

                res.status(400).json({
                    ok: false,
                    msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
                });

            };

        }; //! SECOND-IF-END


    } catch (error) {

        console.log(error);

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

        const { result } = await modelGetUserByID(id); // destructuración de la propiedad 'result' del objeto que devuelve el model

        const { rowCount } = result; // destructuración de la propiedad 'rowCount' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, el usuario no existe en la base de datos

            return res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID "${id}" no existe en la base de datos.`
            });

        };

        const { ok } = await modelDeleteUser(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, es por un error y entra en el catch del model

            res.status(400).json({
                ok: false,
                msg: `ERROR: no se ha podido eliminar el usuario con ID "${id}".`
            });

        } else {

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