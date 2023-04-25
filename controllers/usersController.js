
const getUsers = async (req, res) => {

    res.send('Capturo ruta para getUsers');

}; //!FUNC-GETUSERS


const getUserByEmail = async (req, res) => {

    res.send('Capturo ruta para getUserByEmail');

}; //!FUNC-GETUSERBYEMAIL


const addUser = async (req, res) => {

    res.send('Capturo ruta para addUser');

}; //!FUNC-ADDUSER


const updateUser = async (req, res) => {

    res.send('Capturo ruta para updateUser');

}; //!FUNC-UPDATEUSER


const deleteUser = async (req, res) => {

    res.send('Capturo ruta para deleteUser');

}; //!FUNC-DELETEUSER


module.exports = {
    getUsers,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};