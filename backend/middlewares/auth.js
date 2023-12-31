const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            msg:"not authorized"
        })
    }
    const token = authorization.split(' ')[1];
    const {_id:id} = jwt.verify(token, process.env.SECRET);

    req.user = id;
    next();
}

module.exports = {requireAuth};