const { 
    getGroups,
    getGroupsUsers 
} = require("./groups.service")

module.exports = {

    getGroups: (req, res) => {
        getGroups((err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1, 
                data: results
            })
        })
    },

    getGroupsUsers: (req, res) => {
        getGroupsUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1, 
                data: results
            })
        })
    }


}