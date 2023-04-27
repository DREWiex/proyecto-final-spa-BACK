const {
    modelGetRooms,
    modelGetRoomByID,
    modelAddRoom,
    modelUpdateRoom
} = require('../models/roomsModel');


const getRooms = async (req, res) => {

    try {
        
        const { rowCount, rows } = await modelGetRooms();

        if(rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no hay salas de estudio guardadas en la base de datos.'
            });

        } else {

            res.status(200).json({
                ok: true,
                data: rows
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

}; //!FUNC-GETROOMS


const getRoomByID = async (req, res) => {

    let { id } = req.params;

    try {
        
        const { rowCount, rows } = await modelGetRoomByID(id);

        if(rowCount == 0){

            res.status(400).json({
                ok: false,
                msg: `ERROR: no existe la sala de estudio con ID "${id}" en la base de datos.`
            });

        } else {

            res.status(200).json({
                ok: true,
                data: rows
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

}; //!FUNC-GETROOMBYID


const addRoom = async (req, res) => {

    /**
     * @type {Object}
     */

    const data = {
        role_id: 1,
        ...req.body // recibo el 'user_id' del input hidden del form
    };

    try {
        
        const { ok } = await modelAddRoom(data);

        if(!ok){

            res.status(400).json({
                ok: false,
                msg: 'ERROR: no se ha creado la sala de estudio.'
            });

        } else {

            res.status(201).json({
                ok: true,
                data
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

}; //!FUNC-ADDROOM


const updateRoom = async (req, res) => {

    const { id } = req.params;

    const data = {
        room_id: id,
        ...req.body
    };

    try {

        const { rowCount } = await modelGetRoomByID(id);

        if(rowCount == 0){

            return res.status(400).json({
                ok: false,
                msg: `ERROR: no existe la sala de estudio con ID "${id}" en la base de datos.`
            });

        };

        const { ok } = await modelUpdateRoom(data);

        if(!ok){

            res.status(400).json({
                ok: false,
                msg: `ERROR: no se han actualizado los datos de la sala de estudio con ID "${id}"`
            });

        } else {

            res.status(200).json({
                ok: true,
                data
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

}; //!FUNC-UPDATEROOM


const deleteRoom = async (req, res) => {

    res.send('Capturando la ruta de deleteRoom');

}; //!FUNC-DELETEROOM


module.exports = {
    getRooms,
    getRoomByID,
    addRoom,
    updateRoom,
    deleteRoom
};