module.exports = {
    checkAdmin: (req, res, next) => {
        let role = req.user.result.role
        if (role != "ADMIN") {
            res.json({ 
                success: 0,
                message: "Access denied, unauthorized user"
            })
        } else {
            next();
        }

        

        
    }
}