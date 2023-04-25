const {
    modelGetUsers,
    modelGetUserByEmail,
    modelAddUser,
    modelUpdateUser,
    modelDeleteUser
} = require('../models/usersModel');


const getUsers = async (req, res) => {

    try{

        const { rowCount, rows } = await modelGetUsers(); // rowCount (devuelve '0' o '1') y rows (devuelve un array de objetos con los datos de los usuarios) son propiedades del objeto JSON de la respuesta

        if (rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no existen usuarios en la base de datos.'
            });

        }else{

            res.status(200).json({
                ok: true,
                users: rows
            });

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-GETUSERS


const getUserByEmail = async (req, res) => {

    const { email } = req.params; // params recibe el e-mail del usuario

    try{

        const { rowCount, rows } = await modelGetUserByEmail(email);

        if(rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: `ERROR: el e-mail "${email}" no está registrado en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                user: rows
            });

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-GETUSERBYEMAIL


const addUser = async (req, res) => {

    const data = req.body; // data recibe el objeto body del formulario de registro

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto req.body

    try {

        const { rowCount } = await modelGetUserByEmail(email);

        if (rowCount == 1) {

            res.status(400).json({
                ok: false,
                msg: `ERROR: el e-mail "${email}" ya existe en la base de datos.`
            });

        } else {

            await modelAddUser(data);

            res.status(201).json({
                ok: true,
                msg: 'El usuario se ha registrado con éxito.',
                user: data
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

}; //!FUNC-ADDUSER


const updateUser = async (req, res) => {

    const { id } = req.params; // destructuración de la propiedad 'id' (user_id) del objeto req.params

    const { email } = req.body; // destructuración de la propiedad 'email' del objeto req.body

    const data = {
        id,
        ...req.body // spread de todas las propiedades que recibe el objeto req.body del form (mi perfil –usuario– y dashboard –admin–)
    };

    try {

        const { rowCount, rows } = await modelGetUserByEmail(email);

        if(rowCount == 0){ // condicional: si el e-mail no existe, se procede a la actualización

            await modelUpdateUser(data);

            return res.status(200).json({
                ok: true,
                msg: 'Usuario actualizado con éxito',
                user: data
            });

        };

        if(rowCount == 1){ // condicional: si el e-mail existe, se pueden dar dos casos:

            const [{ user_id }] = rows; // destructuración de la propiedad 'user_id' del array de objetos de la propiedad 'rows' que devuelve el objeto JSON de la respuesta del 'modelGetUserByEmail'

            if(user_id == id){ // si el user_id (del e-mail de la bbdd) coincide con el id (params del usuario actual), sí procede la actualización

                await modelUpdateUser(data);

                return res.status(200).json({
                    ok: true,
                    msg: 'Usuario actualizado con éxito',
                    user: data
                });

            } else {

                return res.status(400).json({
                    ok: false,
                    msg: `ERROR: no se han actualizado los datos. El e-mail "${email}" ya existe en la base de datos.`
                });

            };

        };


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-UPDATEUSER


const deleteUser = async (req, res) => {

    const id = req.params.id;

    try{

        const { rowCount } = await modelDeleteUser(id);

        if(rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: `ERROR: el usuario con ID "${id}" no existe en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                msg: 'El usuario ha sido eliminado correctamente.'

            });

        };

    }catch (error){

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ERROR: contacte con el administrador.',
            error
        });

    };

}; //!FUNC-DELETEUSER


module.exports = {
    getUsers,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};