const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
      User.create(req.body)
        .then((user) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$set: req.body},
                {new: true}
            );
        })
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts were deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
//review what prompt is asking for in README
 createFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
          return User.findOneAndUpdate(
              {_id: req.body.userId},
              {$addToSet: {friends: user._id}},
              {new: true}
              );
      })
  },
};
