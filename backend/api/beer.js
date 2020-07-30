module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const save = (req,res) => {
        const beer = {...req.body}
        if(req.params.id) beer.id = req.params.id

        try{
            existsOrError(beer.name, 'Nome não informado')
            existsOrError(beer.srm, 'Srm não informado')
            existsOrError(beer.ibu, 'Ibu não informado')
            existsOrError(beer.alcohol, 'Teor alcoólico não informado')
            existsOrError(beer.description, 'Descrição não informada')
            existsOrError(beer.styleId, 'Estilo não informado')
            existsOrError(beer.smellId, 'Aroma não informado')
            existsOrError(beer.appearanceId, 'Aparência não informada')
        } catch(msg){
            res.status(400).send(msg)
        }

        if(beer.id) {
            app.db('beer')
                .update(beer)
                .where({id: beer.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(console.log(err)))
        } else {
            app.db('beer')
                .insert(beer)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req,res) => {
        try{
            const rowsDeleted = await app.db('beer')
                .where({id: req.params.id})
                .del()

            try{
                existsOrError(rowsDeleted, 'Cerveja não encontrada')
            } catch(msg) {
                return res.status(400).send(msg)
            }
            
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 15 //Pagination

    /*
    Get => View only because of innerJoin (throw an error at update)
    */
    const get = (req,res) => {   
        const page = req.query.page || 1
        
        app.db('beer')
            .innerJoin('style', 'beer.styleId', '=', 'style.id')
            .select('beer.*', {style: 'style.name'})
            .limit(limit).offset(page * limit - limit)
            .then(beers => res.json(beers))
            .catch(err => res.status(500).send(err))
    }

    /*
    without joins for edit mode
    */
    const getToEdit = (req,res) => {
        app.db('beer')
            .then(beers => res.json(beers))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('beer')
            .where({'beer.id': req.params.id})
            .innerJoin('style', 'beer.styleId', '=', 'style.id')
            .innerJoin('smell', 'beer.smellId', '=', 'smell.id')
            .innerJoin('appearance', 'beer.appearanceId', '=', 'appearance.id')
            .innerJoin('users', 'beer.brewerId', '=', 'users.id')
            .leftJoin('composition', 'beer.compositionId', '=', 'composition.id')
            .select('beer.*', {style: 'style.name'}, {smell: 'smell.name'}, {appearance: 'appearance.name'}, {users: 'users.name'}, {composition: 'composition.name'})
            .first()
            .then(beer => res.json(beer))
            .catch(err => res.status(500).send(err))
    }

    /*
        return all beers from SELF brewer
        used in admin panel
    */
    const getByUser = (req,res) => {
        app.db('beer')
            .where({brewerId: req.user.id})
            .then(beers => res.json(beers))
            .catch(err => res.status(500).send(err))
    }

    const getByStyle = (req,res) => {
        const page = req.query.page || 1

        app.db('beer')
            .where({styleId: req.params.id})
            .innerJoin('style', 'beer.styleId', '=', 'style.id')
            .select('beer.*', {style: 'style.name'})
            .limit(limit).offset(page * limit - limit)
            .then(beers => res.json(beers))
            .catch(err => res.status(500).send(err))
    }

    /*
    return all beers from ID requested brewer
    */
    const getByBrewer = (req,res) => {
        const page = req.query.page || 1

        app.db('beer')
            .where({brewerId: req.params.id})
            .innerJoin('style', 'beer.styleId', '=', 'style.id')
            .select('beer.*', {style: 'style.name'})
            .limit(limit).offset(page * limit - limit)
            .then(beers => res.json(beers))
            .catch(err => res.status(500).send(err))
    }

    return {save,remove,get,getById, getByUser, getByStyle, getByBrewer, getToEdit}
}