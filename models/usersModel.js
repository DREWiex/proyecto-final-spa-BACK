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

        result = client.query(users.queryGetUserByID, [ id ]);

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

        result = await client.query(users.queryGetUserByEmail, [ email ]);

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