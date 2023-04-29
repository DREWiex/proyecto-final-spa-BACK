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

        result = await client.query(users.queryGetUsers);
        
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
    
}; //!FUNC-MODELGETUSERS


const modelGetUserByID = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(users.queryGetUserByID, [ id ]);

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

        const { rowCount } = await client.query(users.queryAddUser, [
            role_id,
            first_name,
            last_name,
            email,
            password,
            avatar
        ]);

        rowCount == 1 ? result = true : result = false; // condicional: true = el usuario se registró / false = el usuario no se registró

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
            first_name,
            last_name,
            email,
            password,
            avatar,
            user_id
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

}; //!FUNC-MODELUPDATEUSER


const modelDeleteUser = async (id) => {

    let client, result;

    try {
        
        client = await pool.connect();

        result = await client.query(users.queryDeleteUser, [ id ]);

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

}; //!FUNC-MODELDELETEUSER


const modelGetUserByEmail = async (email) => {

    let client, result;

    try {
        
        client = await pool.connect();

        const { rowCount, rows } = await client.query(users.queryGetUserByEmail, [ email ]);

        rowCount == 0 ? result = { ok: false, data: rows } : result = { ok: true, data: rows }; // false = no existe e-mail / true = sí existe e-mail

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