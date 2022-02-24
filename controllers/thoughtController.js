const { Reaction, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thoughts with that ID.'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return Thought.findOne(
                    {_id: req.body.thoughtId},
                    {$addToSet: req.body},
                    {new: true}
                );
                res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);     
            });
    },







}