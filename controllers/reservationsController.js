


const getReservations = async (req, res) => {

    res.send('Capturando la ruta de getReservations.');

}; //!FUNC-GETRESERVATIONS


const getReservationByID = async (req, res) => {

    res.send('Capturando la ruta de getReservationByID.');

}; //!FUNC-GETRESERVATIONBYID


const addReservation = async (req, res) => {

    res.send('Capturando la ruta de addReservation.');

}; //!FUNC-ADDRESERVATION


const updateReservation = async (req, res) => {

    res.send('Capturando la ruta de updateReservation.');

}; //!FUNC-UPDATERESERVATION


const deleteReservation = async (req, res) => {

    res.send('Capturando la ruta de deleteReservation.');

}; //!FUNC-DELETERESERVATION


module.exports = {
    getReservations,
    getReservationByID,
    addReservation,
    updateReservation,
    deleteReservation
};