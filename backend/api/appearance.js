module.exports = app => {
    const get = (req,res) => {
        app.db('appearance')
            .select('id', 'name')
            .then(styles => res.json(styles))
            .catch(err => res.status(500).send(err))
    }

    return {get}
}