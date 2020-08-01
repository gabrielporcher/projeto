const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req,res) => {
        const user = {...req.body} //Body-parser monta o "objeto" user atraves do body html
        if(req.params.id) user.id = req.params.id

        //if(!req.originalUrl.startsWith('/users')) user.userType = 1 //previne que admin seja cadastrado pela rota de signup
        //if(!req.user || !req.user.userType == 3) user.userType = 1 // previne que um usuario se torne admin

        try{
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha nã informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha não informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({email: user.email})
            if(!user.id){
                notExistsOrError(userFromDB, 'Usuario ja cadastrado')
            }
        } catch(e){
            return res.status(400).send(e)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id){ //UPDATE\\
            app.db('users')
                .update(user)
                .where({id: user.id})
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { //CREATE\\
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req,res) => {
        app.db('users')
            .select('id', 'name', 'email', 'userType')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('users')
            .select('id', 'name', 'email', 'userType')
            .where({id: req.params.id})
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const getBrewers = (req,res) => {
        app.db('users')
            .select('id', 'name')
            .where({userType: 2})
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({id: req.params.id})
            existsOrError(rowsUpdated, 'Usuário não encontrado')

            res.status(204).send()
        }catch(e){
            res.status(400).send(e)
        }
    }

    return{save, get, getById, remove, getBrewers}
}