const { Pool } = require('pg');

const { rooms } = require('./queries');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS
});


const modelGetRooms = async () => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows: data } = await client.query(rooms.queryGetRooms);

        rowCount == 0 ? result = { ok: false, data } : result = { ok: true, data };

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETROOMS


const modelGetRoomByID = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows } = await client.query(rooms.queryGetRoomByID, [ id ]);

        const [ data ] = rows; // destructuración del array de la propiedad 'rows'

        rowCount == 0 ? result = { ok: false, data } : result = { ok: true, data }; // si es igual a 0, no existe la sala de estudio / si es distinto de 0, sí existe la sala de estudio

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETROOMBYID


const modelAddRoom = async (data) => {

    let client, result;

    const {
        user_id,
        role_id,
        room,
        description,
        photo
    } = data;

    try {
        
        client = await pool.connect();

        result = await client.query(rooms.queryAddRoom, [
            user_id,
            role_id,
            room,
            description,
            photo
        ]);

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELADDROOM


const modelUpdateRoom = async (data) => {

    let client, result;

    const {
        room,
        description,
        photo,
        room_id
    } = data;

    try {
        
        client = await pool.connect();

        result = await client.query(rooms.queryUpdateRoom, [
            room,
            description,
            photo,
            room_id
        ]);

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELUPDATEROOM


const modelDeleteRoom = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(rooms.queryDeleteRoom, [ id ]);

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELDELETEROOM


module.exports = {
    modelGetRooms,
    modelGetRoomByID,
    modelAddRoom,
    modelUpdateRoom,
    modelDeleteRoom
};