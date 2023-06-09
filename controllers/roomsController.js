const {
    modelGetRooms,
    modelGetRoomByID,
    modelAddRoom,
    modelUpdateRoom,
    modelDeleteRoom
} = require('../models/roomsModel');


/**
 * Obtener todas las salas de estudio de la base de datos.
 * @function getRooms
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getRooms = async (req, res) => {

    try {
        
        const { ok, data } = await modelGetRooms(); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, no existen salas de estudio

            res.status(400).json({
                ok: false,
                msg: 'No hay salas de estudio guardadas en la base de datos.'
            });

        } else {

            res.status(200).json({
                ok: true,
                data // devuelve un array de objetos con las propiedades del objeto que contiene los datos de las salas de estudio
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

}; //!FUNC-GETROOMS


/**
 * Obtener por ID una sala de estudio de la base de datos.
 * @function getRoomByID
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getRoomByID = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' de la sala estudio ('room_id') recibido en el objeto req.params

    try {
        
        const { ok, data } = await modelGetRoomByID(id); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, la sala de estudio no existe

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe la sala de estudio con ID "${id}" en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data // devuelve un objeto con los datos de la sala de estudio
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

}; //!FUNC-GETROOMBYID


/**
 * Crear una sala de estudio en la base de datos.
 * @function addRoom
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const addRoom = async (req, res) => {

    /**
     * Contiene los datos de la nueva sala de estudio que se guardarán en la base de datos.
     * @type {Object}
     */

    const newRoom = {
        role_id: 1, // el valor por defecto será 1 ('admin'), ya que solo el admin podrá crear salas de estudio nuevas 
        ...req.body // recibe el objeto body del form del dashboard admin (recibe 'user_id' del input hidden del form)
    };

    try {

        //* VALIDACIÓN 1: INPUT ERRORS

        if(res.errors){ // condicional: validación de errores en los inputs del form

            return res.status(400).json({
                ok: false,
                errors: res.errors // devuelve un objeto con los errores
            });

        };

        //* CREAR SALA DE ESTUDIO
        
        await modelAddRoom(newRoom); // crear una nueva sala de estudio en la base de datos

        res.status(201).json({
            ok: true,
            newRoom // devuelve un objeto con los datos recibidos del form del dashboard admin más el 'role_id' que, por defecto, será 1 ('admin')
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-ADDROOM


/**
 * Actualizar/editar por ID una sala de estudio en la base de datos.
 * @function updateRoom
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params' y 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const updateRoom = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' de la sala estudio ('room_id') recibido en el objeto 'req.params'

    /**
     * Contiene los datos editados de la sala de estudio que se actualizarán en la base de datos.
     * @type {Object}
     */

    const newData = {
        room_id: id, // renombro la propiedad para que coincida con el model
        ...req.body // spread de todas las propiedades que recibe el objeto 'req.body' del form desde el dashboard del admin
    };

    try {

        //* VALIDACIÓN 1: ID

        const { ok } = await modelGetRoomByID(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, la sala de estudio no existe

            return res.status(400).json({
                ok: false,
                msg: `ERROR: no existe la sala de estudio con ID "${id}" en la base de datos.`
            });

        };

        //* VALIDACIÓN 2: INPUT ERRORS

        if(res.errors){ // condicional: validación de errores en los inputs del form

            return res.status(400).json({
                ok: false,
                errors: res.errors // devuelve un objeto con los errores
            });

        };

        //* ACTUALIZAR SALA DE ESTUDIO

        await modelUpdateRoom(newData); // actualizar la sala de estudio en la base de datos

        // obtengo los datos actualizados de la sala de estudio
        const { data: updatedData } = await modelGetRoomByID(id); // destructuración de la propiedad 'data' del objeto que devuelve el model
        // renombro la propiedad 'data' para facilitar la interpretación

        res.status(200).json({
            ok: true,
            updatedData // devuelve un objeto con los datos de la sala de estudio ya actualizados en la base de datos
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-UPDATEROOM


/**
 * Eliminar por ID una sala de estudio de la base de datos.
 * @function deleteRoom
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const deleteRoom = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' de la sala estudio ('room_id') recibido en el objeto 'req.params'

    try {

        const { ok } = await modelGetRoomByID(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, la sala de estudio no existe

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe la sala de estudio con ID "${id}" en la base de datos.`
            });

        } else {
        
            await modelDeleteRoom(id); // eliminar la sala de estudio de la base de datos

            res.status(200).json({
                ok: true,
                msg: 'La sala de estudio se ha eliminado con éxito.'
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

}; //!FUNC-DELETEROOM


module.exports = {
    getRooms,
    getRoomByID,
    addRoom,
    updateRoom,
    deleteRoom
};