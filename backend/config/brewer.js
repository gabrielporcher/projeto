module.exports = middleware => {
    return (req,res,next) => {
        if(req.user.userType == 2 || req.user.userType == 3){
            middleware(req,res,next)
        }else{
            res.status(401).send('Sem permissão')
        }
    }
}