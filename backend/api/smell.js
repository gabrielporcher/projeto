module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const save = (req,res) => {
        const smell = {...req.body}
        if (req.params.id) smell.id = req.params.id

        try{
            existsOrError(smell.name, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(smell.id){
            app.db('smell')
                .update(smell)
                .where({id: smell.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('smell')
                .insert(smell)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            existsOrError(req.params.id, 'Id do aroma não informado')

            const beers = await app.db('beer')
                                    .where({smellId: req.params.id})
            notExistsOrError(beers, 'Composição associada a uma cerveja cadastrada')

            const rowsDeleted = await app.db('smell')
                                        .where({id: req.params.id})
                                        .del()
            existsOrError(rowsDeleted, 'Aroma não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req,res) => {
        app.db('smell')
            .select('id', 'name')
            .then(smells => res.json(smells))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('smell')
            .select('id', 'name')
            .where({id: req.params.id})
            .first()
            .then(smell => res.json(smell))
            .catch(err => res.status(500).send(err))
    }

    return{save, remove, get, getById}
}