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
 * Obtener por ID del usuario todas las reservas de la base de datos.
 * @function getReservationsByUserID
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const getReservationsByUserID = async (req, res) => {

    const { id } = req.params; // destructuración del 'id' del usuario ('user_id') recibido en el objeto 'req.params'

    try {
        
        const { data } = await modelGetReservations(); // destructuración de la propiedad 'data' del objeto que devuelve el model

        const arrayReservations = data.filter(reservation => reservation.user_id == id); // filtra las reservas que correspondan al user_id recibido por params

        if(arrayReservations.length == 0){ // condicional: si el array está vacío, el usuario no tiene ninguna reserva

            res.status(400).json({
                ok: false,
                error: `El usuario con ID "${id}" no tiene reservas.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data: arrayReservations // devuelve un array de objetos con los datos de las reservas hechas por el usuario
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

}; //!FUNC-GETRESERVATIONSBYUSERID


/**
 * Obtener por ID las reservas de una sala de la base de datos.
 * @function searchReservations
 * @async
 * @param {Object} req Objeto de solicitud: recibe 'params'.
 * @param {Object} res Objeto de respuesta: devuelve 'status' y 'json'.
 */
const searchReservations = async (req, res) => { //? do I need it?

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

    const newReservation = req.body; // recibe el objeto body del form del usuario o del dashboard admin (recibe 'user_id' del input hidden del form)

    try {

        //* VALIDACIÓN 1: INPUT ERRORS

        if(res.errors){

            const error = []; // declaro la constante 'error' como un array vacío

            Object.entries(res.errors).forEach(([key, value]) => { // iteración de las propiedades del objeto 'res.errors'

                error.push(value.msg); // envía la propiedad 'msg' de cada key del objeto al array 'error'

            });
            
            return res.status(400).json({
                ok: false,
                error // devuelve un array con los errores
            });

        };

        //! aquí habría que filtrar si coincide con alguna otra reserva (fecha, hora)

        //* CREAR RESERVA
        
        await modelAddReservation(newReservation); // crear una nueva reserva en la base de datos

        res.status(201).json({
            ok: true,
            newReservation // devuelve un objeto con los datos recibidos del form del usuario o del dashboard admin //! en Postman devuelve la fecha de reserva incorrecta, pero en Elephant está bien
        });

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

    const newData = {
        reservation_id: id, // renombro la propiedad para que coincida con el model
        ...req.body // recibe el objeto 'req.body' del form del usuario o del dashboard admin (recibe 'user_id' del input hidden del form)
    };

    try {

        //* VALIDACIÓN 1: ID

        const { ok } = await modelGetReservationByID(id); // destructuración de la propiedad 'ok' del objeto que devuelve el model

        if(!ok){ // condicional: si 'ok' es false, la reserva no existe

            return res.status(400).json({
                ok: false,
                msg: `ERROR: no existe ninguna reserva con el ID "${id}".`
            });

        };

        //* VALIDACIÓN 2: INPUT ERRORS

        if(res.errors){

            const error = []; // declaro la constante 'error' como un array vacío

            Object.entries(res.errors).forEach(([key, value]) => { // iteración de las propiedades del objeto 'res.errors'

                error.push(value.msg); // envía la propiedad 'msg' de cada key del objeto al array 'error'

            });
            
            return res.status(400).json({
                ok: false,
                error // devuelve un array con los errores
            });

        };

        //! aquí habría que filtrar si coincide con alguna otra reserva (fecha, hora)

        //* ACTUALIZAR RESERVA

        await modelUpdateReservation(newData); // actualizar la reserva en la base de datos

        // obtengo los datos actualizados de la reserva
        const { data } = await modelGetReservationByID(id); // destructuración de la propiedad 'data' del objeto que devuelve el model

        res.status(200).json({
            ok: true,
            data // devuelve un objeto con los datos de la sala de estudio ya actualizados en la base de datos //! en Postman devuelve la fecha de reserva incorrecta, pero en Elephant está bien
        });

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
    getReservationsByUserID,
    searchReservations,
    addReservation,
    updateReservation,
    deleteReservation
};