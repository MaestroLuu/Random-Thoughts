const { User, Thought, Reaction } = require("../models");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
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
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought);
        User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        ).then((newThoughtArr) => {
          console.log(newThoughtArr);
        });
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
  // POST new reaction
  createReaction(req, res) {
    Reaction.create(req.body)
    .then((reaction) => {
      console.log(reaction);
      Thought.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { reactions: reaction } },
        { new: true }
      ).then((reactionArr) => {
        console.log(reactionArr);
      });
      res.json(reaction);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });

  },
};
