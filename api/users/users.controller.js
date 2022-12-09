const { 
    create, 
    getUserById, 
    getUsers, 
    updateUser, 
    deleteUser,
    getUserByEmail,
    chooseGroup
} = require("./users.service");


//Permettra de crypter le mot de passe - partie 1
const { genSaltSync, hashSync, compareSync } = require ("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        //Permettra de crypter le mot de passe - partie 2
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {

            //En cas d'erreur----------------
            if (err) {
                console.log(err);
                return res.status(500).json({ 
                    success: 0, 
                    message: "You must enter your email, firstname, lastname and password."
                })
            };
            //-------------------------------

            return res.status(200).json({ 
                success: 1,
                data: results
            }) ;   
        }) 
    },
 
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({ 
                    success: 0,
                    message: "Record not found"
                }) ;
            }

            return res.json({ 
                success:1, 
                data: results
            })
        })
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {

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

    updateUser: (req, res) => {

        const body = req.body;

        if (req.user.result.admin = "ADMIN") {
            body.id = req.params.id
        } else {
            body.id =  req.user.result.id
        }

        if (body.password) {
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
        } 

        if (!body.email) {
            body.email = req.user.result.email
        }

        if (!body.firstname) {
            body.firstname = req.user.result.firstname
        }

        if (!body.lastname) {
            body.lastname = req.user.result.lastname
        }

        updateUser(body, (err, results) => {

            if (err) {
                message: "err"
                return;
            }

            return res.json({
                success: 1, 
                message: "updated successfully"
            })
        })
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            // if (!results) {
            //     return res.json({ 
            //         success: 0,
            //         message: "Record not found"
            //     }) ;
            // }

            return res.json({
                success: 1, 
                message: "user deleted successfully"
            })
        })
    },

    login: (req,res) => {
        const body = req.body;
        // const userId = req.userId;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
            }

            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }

            const result = compareSync(body.password , results.password );
            if (result) { 
                results.password = undefined;
                const jsontoken = sign({ result: results}, "qwe1234", { 
                    expiresIn : "1h"
                }) ;

                return res.json({
                    succes: 1, 
                    message: "login successfully",
                    token: jsontoken,
                });

                

            } else {
                return res.json({
                    succes: 0, 
                    message: "Invalid email or password",
                    token: jsontoken
                });
            }
        });
    },

    chooseGroup: (req,res) => {
        chooseGroup(req, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }


            // if (!results) {
            //     return res.json({ 
            //         success: 0,
            //         message: "Record not found"
            //     }) ;
            // }

            return res.json({
                success: 1, 
                message: "group choosen successfully"
            })


         });
    },

    updateUserByAdmin: (req, res) => {

    }

    
}