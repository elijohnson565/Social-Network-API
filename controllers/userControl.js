const { User, Post } = require('../models');

//user controller
const userControl = {
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('posts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'There is no user with this id' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create user
  createNewUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update user
  updateExistingUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete user
  deleteExistingUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        return Thought.deleteMany({ _id: { $in: userData.posts } });
      })
      .then(() => {
        res.json({ message: 'User and users posts have been deleted' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add friend
  addAFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //remove friend
  removeAFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userControl;
