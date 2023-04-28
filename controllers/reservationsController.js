const {
    modelGetReservations,
    modelGetReservationByID
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
        
        const { ok, result } = await modelGetReservations();  // destructuración de las propiedades 'ok' y 'result' del objeto que devuelve el model

        if(!ok){  //? condicional: si 'ok' es false, es por un error y entra en el catch del model

            return res.status(400).json({
                ok: false,
                msg: 'ERROR: no se han podido obtener resultados.'
            });

        };

        const { rowCount, rows } = result;  // destructuración de las propiedades 'rowCount' y 'rows' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, no existen reservas en la base de datos

            res.status(200).json({
                ok: true,
                msg: 'No hay reservas guardadas en la base de datos.'
            });

        } else {

            res.status(200).json({
                ok: true,
                data: rows  // devuelve un array de objetos con las propiedades del objeto que contiene los datos de las reservas
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

    const { id } = req.params; // destructuración del 'id' de la reserva ('reservation_id') recibido en el objeto req.params

    try {
        
        const { ok, result } = await modelGetReservationByID(id); // destructuración de las propiedades 'ok' y 'result' del objeto que devuelve el model

        if(!ok){ //? condicional: si 'ok' es false, es por un error y entra en el catch del model

            return res.status(400).json({
                ok: false,
                msg: 'ERROR: no se han podido obtener resultados.'
            });

        };

        const { rowCount, rows } = result; // destructuración de las propiedades 'rowCount' y 'rows' del objeto 'result'

        if(rowCount == 0){ // condicional: si 'rowCount' es igual a 0, no existe reserva con ese id en la base de datos

            res.status(400).json({
                ok: false,
                msg: `ERROR: no se encontró ninguna reserva con ID "${id}" en la base de datos.`
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

}; //!FUNC-GETRESERVATIONBYID


const addReservation = async (req, res) => {

    res.send('Capturando la ruta de addReservation.');

}; //!FUNC-ADDRESERVATION


const updateReservation = async (req, res) => {

    res.send('Capturando la ruta de updateReservation.');

}; //!FUNC-UPDATERESERVATION


const deleteReservation = async (req, res) => {

    res.send('Capturando la ruta de deleteReservation.');

}; //!FUNC-DELETERESERVATION


module.exports = {
    getReservations,
    getReservationByID,
    addReservation,
    updateReservation,
    deleteReservation
};