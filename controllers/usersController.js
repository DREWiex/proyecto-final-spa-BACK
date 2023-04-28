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

    try{

        const { rowCount, rows } = await modelGetUsers(); // rowCount (devuelve '0' o '1') y rows (devuelve un array de objetos con los datos de los usuarios) son propiedades del objeto JSON de la respuesta

        if (rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no existen usuarios en la base de datos.'
            });

        }else{

            res.status(200).json({
                ok: true,
                data: rows
            });

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-GETUSERS

/**
 * Obtener por ID un usuario de la base de datos
 * @function getUserByID
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'
 */
const getUserByID = async (req, res) => {

    const { id } = req.params; // params recibe el id del usuario

    try{

        const { rowCount, rows } = await modelGetUserByID(id);

        if(rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe ningún usuario con el ID "${id}" en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data: rows
            });

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-GETUSERBYEMAIL

/**
 * Crear un nuevo usuario en la bbdd
 * @function addUser
 * @async
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 */
const addUser = async (req, res) => {

    /**
     * @type {Object}
     */

    const data = {
        role_id: 2, // el valor por defecto será 2 ('user') (1 = 'admin')
        ...req.body // recibe el objeto body del form de registro y del dashboard del admin
    };

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto req.body

    try{

        const { rowCount } = await modelGetUserByEmail(email); // consulto en la bbdd si ya existe o no un usuario registrado con ese e-mail

        if (rowCount == 1) { // condicional: si rowCount es igual a 1, sí existe

            res.status(400).json({
                ok: false,
                msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
            });

        } else {

            await modelAddUser(data); // si no existe el e-mail en la bbdd, se crea el usuario

            res.status(201).json({
                ok: true,
                msg: 'El usuario se ha registrado con éxito.',
                data
            });

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-ADDUSER

/**
 * Editar/actualizar un usuario ya existente en la bbdd
 * @function updateUser
 * @async
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 */
const updateUser = async (req, res) => {

    const { id } = req.params; // destructuración de la propiedad 'id' (user_id) del objeto req.params

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto req.body

    const data = {
        user_id: id, // renombro la propiedad para que coincida con el modelo
        ...req.body // spread de todas las propiedades que recibe el objeto req.body del form (mi perfil –usuario– y dashboard –admin–)
    };

    try{

        const { rowCount, rows } = await modelGetUserByEmail(email);

        if(rowCount == 0){ // condicional: si el e-mail no existe, el usuario se actualiza

            await modelUpdateUser(data);

            return res.status(200).json({
                ok: true,
                msg: 'Usuario actualizado con éxito',
                data
            });

        };

        if(rowCount == 1){ // condicional: si el e-mail existe, se pueden dar dos casos:

            const [{ user_id }] = rows; // destructuración de la propiedad 'user_id' del array de objetos de la propiedad 'rows' que devuelve el objeto JSON de la respuesta del 'modelGetUserByEmail'

            if(user_id == id){ // si el 'user_id' (obtenido de la bbdd  por consulta en el modelGetUserByEmail) coincide con el 'id' (params del usuario actual), el usuario se actualiza

                await modelUpdateUser(data);

                return res.status(200).json({
                    ok: true,
                    msg: 'Usuario actualizado con éxito',
                    data
                });

            } else {

                return res.status(400).json({
                    ok: false,
                    msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
                });

            };

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-UPDATEUSER

/**
 * Elimina un usuario de la bbdd
 * @function deleteUser
 * @async
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 */
const deleteUser = async (req, res) => {

    /**
     * @type {String}
     */

    const id = req.params.id; // 'user_id' del usuario obtenido del objeto params

    try{

        const { rowCount } = await modelDeleteUser(id);

        if(rowCount == 0){ // condicional: si es igual a 0, el usuario no existe en la bbdd

            res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID "${id}" no existe en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                msg: 'El usuario ha sido eliminado correctamente.'

            });

        };

    }catch (error){

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