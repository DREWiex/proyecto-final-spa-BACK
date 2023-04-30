const {
    modelGetReservations,
    modelGetReservationByID,
    modelSearchReservations,
    modelAddReservation,
    modelUpdateReservation,
    modelDeleteReservation
} = require('../models/reservationsModel');


/**
 * Obtener todas las reservas de la base de datos.
 * @function getReservations
 * @async
 * @param {Object} req Objeto de solicitud.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getReservations = async (req, res) => {

    try {
        
        const { ok, data } = await modelGetReservations();  // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, no existen reservas

            res.status(400).json({
                ok: false,
                msg: 'No hay reservas guardadas en la base de datos.'
            });

        } else {

            res.status(200).json({
                ok: true,
                data  // devuelve un array de objetos con las propiedades del objeto que contiene los datos de las reservas
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

}; //!FUNC-GETRESERVATIONS


/**
 * Obtener por ID una reserva de la base de datos.
 * @function getReservationByID
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getReservationByID = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' de la reserva ('reservation_id') recibido en el objeto 'req.params'

    try {
        
        const { ok, data } = await modelGetReservationByID(id); // destructuración de las propiedades 'ok' y 'data' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, la reserva no existe

            res.status(400).json({
                ok: false,
                msg: `ERROR: no se encontró ninguna reserva con ID "${id}" en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data // devuelve un objeto con los datos de la reserva
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

}; //!FUNC-GETRESERVATIONBYID


/**
 * Obtener por ID las reservas de una sala de la base de datos.
 * @function searchReservations
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const searchReservations = async (req, res) => {

    const { id } = req.params;  // destructuración del 'id' de la sala de estudio ('room_id') recibido en el objeto 'req.params' (el front-end lo recibe del form desde el usuario o desde el dashboard admin y se lo pasa a la url del fetch)

    try {
        
        const { ok, data } = await modelSearchReservations(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, no existen reservas para la sala de estudio

            res.status(200).json({
                ok: true,
                msg: `No existen reservas para la sala con ID "${id}".`
            });

        } else {

            res.status(200).json({
                ok: true,
                data // devuelve un array con el objeto que contiene los datos de las reservas de la sala
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

}; //!FUNC-SEARCHRESERVATIONS


/**
 * Crear una reserva de sala de estudio en la base de datos.
 * @function addReservation
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const addReservation = async (req, res) => {

    /**
     * @type {Object}
     */

    const data = req.body; // recibe el objeto body del form del usuario o del dashboard admin (recibe 'user_id' del input hidden del form)

    try {
        
        const { ok } = await modelAddReservation(data); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){  //? condicional: si 'ok' es false, es por un error y entra en el catch del model

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no se ha podido realizar la reserva.'
            });

        } else {

            res.status(201).json({
                ok: true,
                data // devuelve los datos recibidos del form del usuario o del dashboard admin //! en Postman devuelve la fecha de reserva incorrecta, pero en Elephant está bien
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

}; //!FUNC-ADDRESERVATION


/**
 * Actualizar/editar por ID una reserva en la base de datos.
 * @function updateReservation
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params' y 'body'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const updateReservation = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' de la reserva ('reservation_id') recibido en el objeto 'req.params'

    /**
     * @type {Object}
     */

    const data = {
        reservation_id: id, // renombro la propiedad para que coincida con el model
        ...req.body // recibe el objeto body del form del usuario o del dashboard admin
    };

    try {

        const { result } = await modelGetReservationByID(id); // destructuración de la propiedad 'result' del objeto que devuelve el model

        const { rowCount } = result; // destructuración de la propiedad 'rowCount' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, no existe reserva con ese id en la base de datos

            return res.status(200).json({
                ok: false,
                msg: `ERROR: no existe ninguna reserva con el ID "${id}".`
            });

        };

        const { ok } = await modelUpdateReservation(data); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ //? condicional: si 'ok' es false, es por un error y entra en el catch del model

            res.status(400).json({
                ok: false,
                msg: `ERROR: la reserva con ID "${id}" no ha sido actualizada.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data // devuelve los datos recibidos del form del usuario o del dashboard admin //! en Postman devuelve la fecha de reserva incorrecta, pero en Elephant está bien
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

}; //!FUNC-UPDATERESERVATION


/**
 * Eliminar por ID una reserva de la base de datos.
 * @function deleteReservation
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const deleteReservation = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' de la reserva ('reservation_id') recibido en el objeto 'req.params'

    try {
        
        const { ok } = await modelGetReservationByID(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, la reserva no existe

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe ninguna reserva con el ID "${id}" en la base de datos.`
            });

        } else {

            await modelDeleteReservation(id);

            res.status(200).json({
                ok: true,
                msg: `La reserva se ha eliminado correctamente.`
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

}; //!FUNC-DELETERESERVATION


module.exports = {
    getReservations,
    getReservationByID,
    searchReservations,
    addReservation,
    updateReservation,
    deleteReservation
};