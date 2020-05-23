const allow = require('./permission')

module.exports = app => {
    //Essas serão as unicas URLS publicas (Não precisam do token)
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate()) //Filtro do passport
        .post(allow(app.api.user.save))
        .get(allow(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(allow(app.api.user.save))
        .get(allow(app.api.user.getById))
}