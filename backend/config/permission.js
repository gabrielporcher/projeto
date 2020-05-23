module.exports = middleware => { //passa middleware como parametro em função {recebe o endereço da rota}
    return (req,res,next) => {
        if(req.user.tipo == 3){
            middleware(req,res,next)
        }else{
            res.status(401).send('Usuario não é administrador')
        }
    }
}