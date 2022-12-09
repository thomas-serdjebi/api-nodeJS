const pool = require ("../../config/database");


module.exports = {
    //permet de créer une méthode create qui va récupérer des data et 
    //appeler la fonction callback à l'intérieur de cette méthode

    //Route permettant à un utilisateur de s'enregistrer - access : all
    create: (data, callBack) => {
        const now = new Date(Date.now());
        const created = now.toISOString().slice(0, 19).replace('T', ' ');
        const defaultRole = "USER";

        pool.query(
            'insert into users (email, firstname, lastname, created_at, updated_at, password, group_id, role) values (?,?,?,?,?,?,?, ?)',
            [
             data.email,
             data.firstname,
             data.lastname,
             created,
             data.updated_at,
             data.password, 
             data.group_id,
             defaultRole
            ], 
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    //Route retournant tous les utilisateurs dans une liste contenant les champs prénoms et noms - access : all
    getUsers: callBack => {
        pool.query(
            'select firstname, lastname from users ',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //Route qui permet d'avoir les détails d'un user (nom/prenom/email/groupe) - access : user authen + admin
    getUserById: (id, callBack) => {
        pool.query(
            'select firstname, lastname, email, group_id from users where id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },


    //Route permettant à un utilisateur de modifier ses informations - access : utilisateur connecté et concerné
    updateUser: (data, callBack) => {
        const now = new Date(Date.now());
        const updated = now.toISOString().slice(0, 19).replace('T', ' ');

        let queryString;
        let dataArray;

        if(data.password) {
            queryString = 'update users set email =  ?, firstname = ? , lastname = ?, updated_at = ?, password = ? where id = ?' 
            dataArray =   [
                data.email,
                data.firstname,
                data.lastname,
                updated,
                data.password, 
                data.id
            ]  
        } else {
            queryString = 'update users set email =  ?, firstname = ? , lastname = ?, updated_at = ? where id = ?'
            dataArray =   [
                data.email,
                data.firstname,
                data.lastname,
                updated,
                data.id
            ]
        }
        
        pool.query(
            queryString,
            dataArray,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },

    //Route permettant de delete un utilisateur
    deleteUser: (data, callBack) => {
        pool.query(
            'delete from users where id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    
    //Route qui permet à l'utilisateur de se connecter
    getUserByEmail: (email, callBack) => {
        pool.query(
            'select * from users where email = ?',
            [email],
            (error, results, Fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    
    //Route qui permet à l'utilisateur de s'ajouter à un groupe
    chooseGroup: (req,callBack) => {
        const id = req.user.result.id
        const group = req.body.group
        pool.query(
            'update users set group_id = ? where users.id = ?',
            [group, id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    }

    //Route permettant à un admin de modifier les informations d'un user 


};