const { 
    createUser, 
    getUserById, 
    getUsers, 
    updateUser, 
    deleteUser,
    login,
    chooseGroup,
    updateUserByAdmin
} = require("./users.controller");

const router = require("express").Router();
const { checkToken } = require ("../../auth/token_validation");
const { checkAdmin } = require ("../../auth/admin_validation");

//Route qui permet à l'utilisateur de créer un compte
router.post("/", createUser);

//Route qui retourne les utilisateur dans une liste avec noms et prénoms
router.get("/", getUsers);

//Route qui permet d'avoir les détails d'un user 
//Retournant nom prénoms email et groupe 
//Access uniquement sur authentification admin ou user
router.get("/:id", checkToken, getUserById);


//Route qui permet à un user de modifier ses informations
//Access uniquement sur authentification admin ou user
router.patch("/", checkToken, updateUser);

//Route qui permet de delete un user
//Access uniquement admin
router.delete("/", checkToken, checkAdmin, deleteUser);

//Route qui permet à un user de se connecter
router.post("/login", login)

//Route qui permet à un user connecté de choisir un groupe
//Access uniquement si utilisateur connecté
router.patch("/group", checkToken, chooseGroup);

//Route qui permet à un admin de modifier un user
router.patch("admin/user/:id", checkToken, checkAdmin, updateUser)

module.exports = router;