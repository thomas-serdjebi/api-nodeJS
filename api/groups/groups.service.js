const pool = require ("../../config/database");

module.exports = {

    getGroups: callBack => {
        pool.query(
            'select name from groups',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getGroupsUsers: callBack => {
        pool.query(
            'select distinct groups.name, users.firstname, users.lastname from groups inner join users on users.group_id = groups.id order by groups.name ',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    }
}