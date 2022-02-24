const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by _id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //PUT update user by _id
  //Ask about criteria again
  updateUser(req, res) {
    User.create(req.body)
      .then((user) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $set: req.body },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      );
  },
  // DELETE user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts were deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //review what prompt is asking for in README
  // POST to add new friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.userId } },
      { new: true }
    )
      .then((user) => 
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },
  // DELETE to remove friend from list
  removeFriend(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Friend.findOneAndUpdate(
            { friends: req.params.userId },
            { $pull: { friends: req.params.userId} },
            { new: true} 
          )
      )
      .then((friend) =>
        !friend
            ?res.status(404).json({
              message: 'Friend was removed, but user cannot be found',
            })
            : res.json({ message: "Your friend was removed from the list!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
