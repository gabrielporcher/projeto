const admin = require('./permission')
const self = require('./selfPermission')

module.exports = app => {
    //Essas serão as unicas URLS publicas (Não precisam do token)
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate()) //Filtro do passport
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/user/:id') //Usuário editar seus dados
        .all(app.config.passport.authenticate())
        .put(self(app.api.user.save))
        .get(self(app.api.user.getById))

}