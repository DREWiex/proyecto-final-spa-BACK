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
    SET first_name=$1, last_name=$2, email=$3, password=$4, avatar=$5
    WHERE user_id=$6`,
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
    WHERE room_id=$4`
}; //ROOMS


module.exports = {
    users,
    rooms
}