const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe email e senha')
        }

        const user = await app.db('users')
            .where({email: req.body.email})
            .whereNull('deletedAt')
            .first()

        if(!user) return res.status(400).send('Usuario não encontrado')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Email ou senha invalido')

        const now = Math.floor(Date.now()/1000) //Js manda data em miliseconds

        const payLoad = {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            iat: now, //Issued At Time
            exp: now + (60 * 60 * 24 * 3) //Data de expiração do token
                    // (60 segundos * 60 = 1 hora // * 24 = 1 dia // * 3 = 3 dias)
        }

        res.json({
            ...payLoad,
            token: jwt.encode(payLoad, authSecret)
        })
    }

    const validateToken = async (req,res) => {
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) { // * mil, o token é enviado em segundos e o JS funciona em MS
                    return res.send(true)
                }
            }
        } catch(e){
            res.send(false) // Problema no token
        }
    }

    return{signin, validateToken}
}