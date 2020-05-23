const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) =>{
        app.db('users')
            .where({id: payload.id})
            .first()
            .then(user =>done(null, user ? {...payload} : false)) // Se o usuario estiver setado, retorna o payload. se não retorna false.
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return{
        authenticate: () => passport.authenticate('jwt', {session: false})
        //Usa para filtrar requisições //nao tem nenhum controle de sessão
    }
}