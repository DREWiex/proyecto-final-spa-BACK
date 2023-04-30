const { Pool } = require('pg');

const { reservations } = require('./queries');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS
});


const modelGetReservations = async () => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows } = await client.query(reservations.queryGetReservations);

        rowCount == 0 ? result = { ok: false, data: rows } : result = { ok: true, data: rows };

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETRESERVATIONS


const modelGetReservationByID = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect()

        const { rowCount, rows } = await client.query(reservations.queryGetReservationByID, [ id ]);

        const [ data ] = rows; // destructuración del array de la propiedad 'rows'

        rowCount == 0 ? result = { ok: false, data } : result = { ok: true, data }; // si es igual a 0, no existe la reserva / si es distinto de 0, sí existe la reserva

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETRESERVATIONBYID


const modelSearchReservations = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows } = await client.query(reservations.querySearchReservations, [ id ]);

        rowCount == 0 ? result = { ok: false, data: rows } : result = { ok: true, data: rows }; // si es igual a 0, no existen reservas para la sala de estudio / si es distinto de 0, sí existen reservas para la sala de estudio

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELSEARCHRESERVATIONS


const modelAddReservation = async (data) => {

    let client, result;

    const {
        user_id,
        room_id,
        reservation_date,
        start_time,
        end_time
    } = data;

    try {
        
        client = await pool.connect();

        result = await client.query(reservations.queryAddReservation, [
            user_id,
            room_id,
            reservation_date,
            start_time,
            end_time
        ]);

    } catch (error) {
        
        throw {
            ok: false,
            error
        };

    } finally {

        client.release();

    };

    return {
        ok: true,
        result
    };

}; //!FUNC-MODELADDRESERVATION


const modelUpdateReservation = async (data) => {

    let client, result;

    const {
        room_id,
        reservation_date,
        start_time,
        end_time,
        reservation_id
    } = data;

    try {
        
        client = await pool.connect();

        result = await client.query(reservations.queryUpdateReservation, [
            room_id,
            reservation_date,
            start_time,
            end_time,
            reservation_id
        ]);

    } catch (error) {
        
        throw {
            ok: false,
            error
        };

    } finally {

        client.release();

    };

    return {
        ok: true,
        result
    };

}; //!FUNC-MODELUPDATERESERVATION


const modelDeleteReservation = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(reservations.queryDeleteReservation, [ id ]);

    } catch (error) {
        
        throw {
            ok: false,
            error
        };

    } finally {

        client.release();

    };

    return {
        ok: true,
        result
    };

}; //!FUNC-MODELDELETERESERVATION


module.exports = {
    modelGetReservations,
    modelGetReservationByID,
    modelSearchReservations,
    modelAddReservation,
    modelUpdateReservation,
    modelDeleteReservation
};