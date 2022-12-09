const { verify } = require ("jsonwebtoken")

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization")
        if(token) {
            token = token.slice(7);
            verify(token, "qwe1234",(err, decodedToken) => {
                if(err) {
                    res.json({
                        success:0,
                        message: "invalid token"
                    }) ;
                } else {
                    req.user = decodedToken
                    console.log(req.user)
                    next();
                }
            })
        } else {
            res.json({
                success:0,
                message: "Access denied, unauthorized user"
            })
        }
    }


}