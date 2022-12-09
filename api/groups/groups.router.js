const { 
    getGroups,
    getGroupsUsers
} = require("./groups.controller");
const router = require("express").Router();

//Route retournant le nom des groupes
router.get("/", getGroups);

//Route retournant le nom des groupes et les utilisateurs associés (noms et prénoms)
router.get("/users", getGroupsUsers);

module.exports = router