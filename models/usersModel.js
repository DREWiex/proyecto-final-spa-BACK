const { Pool } = require('pg');

const { users } = require('./queries');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS
});


const modelGetUsers = async () => {

    let client, result;

    try {

        client = await pool.connect();

        const { rowCount, rows } = await client.query(users.queryGetUsers);

        rowCount == 0 ? result = { ok: false, data: rows } : result = { ok: true, data: rows };
        
    } catch (error) {

        throw error;

    } finally {

        client.release();

    };

    return result;
    
}; //!FUNC-MODELGETUSERS


const modelGetUserByID = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows } = await client.query(users.queryGetUserByID, [ id ]);

        const [ data ] = rows; // destructuración del array de la propiedad 'rows'

        rowCount == 0 ? result = { ok: false, data } : result = { ok: true, data }; // si es igual a 0, no existe el usuario / si es distinto de 0, sí existe el usuario

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETUSERBYID


const modelAddUser = async (data) => {

    let client, result;

    const {
        role_id,
        first_name,
        last_name,
        email,
        password,
        avatar,
    } = data;

    try {
        
        client = await pool.connect();

        result = await client.query(users.queryAddUser, [
            role_id,
            first_name,
            last_name,
            email,
            password,
            avatar
        ]);

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELADDUSER


const modelUpdateUser = async (data) => {

    let client, result;

    const {
        role_id,
        first_name,
        last_name,
        email,
        password,
        avatar,
        user_id
    } = data;

    try {
        
        client = await pool.connect();

        result = await client.query(users.queryUpdateUser, [
            role_id,
            first_name,
            last_name,
            email,
            password,
            avatar,
            user_id
        ]);

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELUPDATEUSER


const modelDeleteUser = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(users.queryDeleteUser, [ id ]);

    } catch (error) {
        
        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELDELETEUSER


const modelGetUserByEmail = async (email) => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows } = await client.query(users.queryGetUserByEmail, [ email ]);

        const [ data ] = rows; // destructuración del array de la propiedad 'rows'

        rowCount == 0 ? result = { ok: false, data } : result = { ok: true, data }; // si es igual a 0, no existe el e-mail / si es distinto de cero, sí existe e-mail

    } catch (error) {

        throw error;

    } finally {

        client.release();

    };

    return result;

}; //!FUNC-MODELGETUSERBYEMAIL


module.exports = {
    modelGetUsers,
    modelGetUserByID,
    modelAddUser,
    modelUpdateUser,
    modelDeleteUser,
    modelGetUserByEmail
};