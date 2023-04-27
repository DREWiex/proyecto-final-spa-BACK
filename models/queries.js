const users={
    queryGetUsers:`
    SELECT u.user_id, roles.role, u.first_name, u.last_name, u.email, u.password, u.avatar, u.register_date
    FROM users AS u
    INNER JOIN roles ON u.role_id=roles.role_id
    ORDER BY user_id DESC`,
    queryGetUserByID:`
    SELECT u.user_id, roles.role, u.first_name, u.last_name, u.email, u.password, u.avatar, u.register_date
    FROM users AS u
    INNER JOIN roles ON u.role_id=roles.role_id
    WHERE user_id=$1`,
    queryAddUser:`
    INSERT INTO users (role_id, first_name, last_name, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    queryUpdateUser:`
    UPDATE users
    SET first_name=$1, last_name=$2, email=$3, password=$4, avatar=$5
    WHERE user_id=$6`,
    queryDeleteUser:`
    DELETE FROM users
    WHERE user_id=$1;`,
    queryGetUserByEmail:`
    SELECT u.user_id, roles.role, u.first_name, u.last_name, u.email, u.password, u.avatar, u.register_date
    FROM users AS u
    INNER JOIN roles ON u.role_id=roles.role_id
    WHERE email=$1`
};

module.exports = {
    users
}