const users={
    queryGetUsers:`
    SELECT *
    FROM users
    ORDER BY user_id DESC`,
    queryGetUserByEmail:`
    SELECT *
    FROM users
    WHERE email=$1`,
    queryAddUser:`
    INSERT INTO users (role_id, first_name, last_name, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    queryUpdateUser:`
    UPDATE users
    SET first_name=$1, last_name=$2, email=$3, password=$4, avatar=$5
    WHERE user_id=$6`,
    queryDeleteUser:`
    DELETE FROM users
    WHERE user_id=$1;`
};

module.exports = {
    users
}