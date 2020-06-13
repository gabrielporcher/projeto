module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const save = (req,res) => {
        const composition = {...req.body}
        if(req.params.id) composition.id = req.params.id

        try{
            existsOrError(composition.name, 'Nome não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(composition.id){
            app.db('composition')
            .update(composition)
            .where({id: composition.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            app.db('composition')
            .insert(composition)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            existsOrError(req.params.id, 'Id da composição não informado')

            const beers = await app.db('beer')
                                    .where({compositionId: req.params.id})
            notExistsOrError(beers, 'Composição associada a uma cerveja cadastrada')

            const rowsDeleted = await app.db('composition')
                                        .where({id: req.params.id})
                                        .del()
            existsOrError(rowsDeleted, 'Composição não encontrada')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req,res) => {
        app.db('composition')
            .select('id', 'name')
            .then(compositions => res.json(compositions))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('composition')
        .select('id', 'name')
        .where({id: req.params.id})
        .first()
        .then(composition => res.json(composition))
        .catch(err => res.status(500).send(err))
    }

    return{save, remove, get, getById}
}