const { User, Reaction, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // GET single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with that ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // POST new thought and push to user's thought array
  // check with john
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // PUT thought update
  updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err); 
        res.status(500).json(err);
      });
  },
  // Delete thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Thought.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() =>
        res.json({ message: "Thought and associated reactions were deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};