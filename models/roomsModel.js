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

        result = await client.query(rooms.queryGetRooms);

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

}; //!FUNC-MODELGETROOMS


const modelGetRoomByID = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(rooms.queryGetRoomByID, [ id ]);

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
        
        throw {
            ok: false,
            error
        };

    } finally {

        client.release();

    };

    return{
        ok: true,
        result
    };

}; //!FUNC-MODELUPDATEROOM


const modelDeleteRoom = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(rooms.queryDeleteRoom, [ id ]);

    } catch (error) {
        
        throw {
            ok: false,
            error
        };

    } finally {

        client.release();

    };

    return{
        ok: true,
        result
    };

}; //!FUNC-MODELDELETEROOM


module.exports = {
    modelGetRooms,
    modelGetRoomByID,
    modelAddRoom,
    modelUpdateRoom,
    modelDeleteRoom
};