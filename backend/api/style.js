module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const save = (req, res) => {
        const style = {...req.body}

        if (req.params.id) style.id = req.params.id

        try{
            existsOrError(style.name, 'Nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(style.id){
            app.db('style')
                .update(style)
                .where({id: style.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('style')
                .insert(style)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    
    const get = (req,res) => {
        app.db('style')
            .select('id', 'name')
            .then(styles => res.json(styles))
            .catch(err => res.status(500).send(err))
    }

    return {get, save}
}