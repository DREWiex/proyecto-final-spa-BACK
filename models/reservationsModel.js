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

        result = await client.query(reservations.queryGetReservations);

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

}; //!FUNC-MODELGETRESERVATIONS


const modelGetReservationByID = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect()

        result = await client.query(reservations.queryGetReservationByID, [ id ]);

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

}; //!FUNC-MODELGETRESERVATIONBYID


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


const modelSearchReservations = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(reservations.querySearchReservations, [ id ]);

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

};


module.exports = {
    modelGetReservations,
    modelGetReservationByID,
    modelAddReservation,
    modelSearchReservations
};