const admin = require('./permission')
const self = require('./selfPermission')
const brewer = require('./brewer')

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

    app.route('/brewers')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getBrewers)

    app.route('/compositions')
        .all(app.config.passport.authenticate())
        .get(app.api.composition.get)
        .post(brewer(app.api.composition.save))

    app.route('/compositions/:id')
        .all(app.config.passport.authenticate())
        .put(brewer(app.api.composition.save))
        .get(brewer(app.api.composition.getById))
        .delete(brewer(app.api.composition.remove))

    app.route('/smells')
        .all(app.config.passport.authenticate())
        .get(app.api.smell.get)
        .post(brewer(app.api.smell.save))

    app.route('/smells/:id')
        .all(app.config.passport.authenticate())
        .put(brewer(app.api.smell.save))
        .get(brewer(app.api.smell.getById))
        .delete(brewer(app.api.smell.remove))

    app.route('/beers')
        .all(app.config.passport.authenticate())
        .get(app.api.beer.get)
        .post(brewer(app.api.beer.save))

    app.route('/beers/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.beer.getById)
        .put(brewer(app.api.beer.save))
        .delete(brewer(app.api.beer.remove))

    app.route('/beers/style/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.beer.getByStyle)

    /*
        /beers/brewer/:id
        return all beers from ID requested brewer
    */
    app.route('/beers/brewer/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.beer.getByBrewer)

    /*
        /brewer/beers
        return all beers from SELF brewer
        used in admin panel
    */
    app.route('/brewer/beers')
        .all(app.config.passport.authenticate())
        .get(brewer(app.api.beer.getByUser))

    app.route('/styles')
        .all(app.config.passport.authenticate())
        .get(app.api.style.get)
        .post(admin(app.api.style.save))


    app.route('/appearances')
        .all(app.config.passport.authenticate())
        .get(app.api.appearance.get)
}