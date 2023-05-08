const users = {
    queryGetUsers: `
    SELECT u.user_id, roles.role, u.first_name, u.last_name, u.email, u.password, u.avatar, u.register_date
    FROM users AS u
    INNER JOIN roles ON u.role_id=roles.role_id
    ORDER BY user_id DESC`,
    queryGetUserByID: `
    SELECT u.user_id, roles.role, u.first_name, u.last_name, u.email, u.password, u.avatar, u.register_date
    FROM users AS u
    INNER JOIN roles ON u.role_id=roles.role_id
    WHERE user_id=$1`,
    queryAddUser: `
    INSERT INTO users (role_id, first_name, last_name, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    queryUpdateUser: `
    UPDATE users
    SET role_id=$1, first_name=$2, last_name=$3, email=$4, password=$5, avatar=$6
    WHERE user_id=$7`,
    queryDeleteUser: `
    DELETE FROM users
    WHERE user_id=$1;`,
    queryGetUserByEmail: `
    SELECT u.user_id, roles.role, u.first_name, u.last_name, u.email, u.password, u.avatar, u.register_date
    FROM users AS u
    INNER JOIN roles ON u.role_id=roles.role_id
    WHERE email=$1`
}; //USERS


const rooms = {
    queryGetRooms:`
    SELECT r.room_id, r.room, r.description, r.photo, users.first_name AS author, roles.role, r.creation_date
    FROM ((rooms AS r
    INNER JOIN users ON r.user_id=users.user_id)
    INNER JOIN roles ON r.role_id=roles.role_id)
    ORDER BY room_id DESC;`,
    queryGetRoomByID:`
    SELECT r.room_id, r.room, r.description, r.photo, users.first_name AS author, roles.role, r.creation_date
    FROM ((rooms AS r
    INNER JOIN users ON r.user_id=users.user_id)
    INNER JOIN roles ON r.role_id=roles.role_id)
    WHERE room_id=$1`,
    queryAddRoom:`
    INSERT INTO rooms (user_id, role_id, room, description, photo)
    VALUES ($1, $2, $3, $4, $5)`,
    queryUpdateRoom:`
    UPDATE rooms
    SET room=$1, description=$2, photo=$3
    WHERE room_id=$4`,
    queryDeleteRoom:`
    DELETE FROM rooms
    WHERE room_id=$1`
}; //ROOMS


const reservations = {
    queryGetReservations:`
    SELECT r.reservation_id, users.user_id, users.first_name, users.last_name, rooms.room, r.reservation_date, r.start_time, r.end_time, r.creation_date
    FROM ((reservations AS r
    INNER JOIN users ON r.user_id=users.user_id)
    INNER JOIN rooms ON r.room_id=rooms.room_id)
    ORDER BY reservation_date, start_time;`,
    queryGetReservationByID:`
    SELECT r.reservation_id, users.user_id, users.first_name, users.last_name, rooms.room, r.reservation_date, r.start_time, r.end_time, r.creation_date
    FROM ((reservations AS r
    INNER JOIN users ON r.user_id=users.user_id)
    INNER JOIN rooms ON r.room_id=rooms.room_id)
    WHERE reservation_id=$1`,
    querySearchReservations:`
    SELECT room_id, reservation_date, start_time, end_time
    FROM reservations
    WHERE room_id=$1`,
    queryAddReservation:`
    INSERT INTO reservations (user_id, room_id, reservation_date, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5)`,
    queryUpdateReservation:`
    UPDATE reservations
    SET user_id=$1, room_id=$2, reservation_date=$3, start_time=$4, end_time=$5
    WHERE reservation_id=$6`,
    queryDeleteReservation:`
    DELETE FROM reservations
    WHERE reservation_id=$1`
}; //RESERVATIONS


module.exports = {
    users,
    rooms,
    reservations
}