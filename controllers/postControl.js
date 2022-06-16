const { Post, User } = require('../models');

//post controller
const postControl = {
  //get all of the posts
  getPosts(req, res) {
    Post.find()
      .sort({ createdAt: -1 })
      .then((postData) => {
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get only one post
  getOnePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .then((postData) => {
        if (!postData) {
          return res.status(404).json({ message: 'No post found with this id' });
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create a new post
  createPost(req, res) {
    Post.create(req.body)
      .then((postData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: postData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'There is no user with this id' });
        }

        res.json({ message: 'Post created' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update an existing post
  updateAPost(req, res) {
    Post.findOneAndUpdate({ _id: req.params.postId }, { $set: req.body }, { runValidators: true, new: true })
      .then((postData) => {
        if (!postData) {
          return res.status(404).json({ message: 'There is no post with this id' });
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete a post
  deleteAPost(req, res) {
    Post.findOneAndRemove({ _id: req.params.postId })
      .then((postData) => {
        if (!postData) {
          return res.status(404).json({ message: 'There is no post with this id' });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.postId },
          { $pull: { thoughts: req.params.postId } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'There is no user with this id' });
        }
        res.json({ message: 'Post created' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //create a new response to a post
  createResponse(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { responses: req.body } },
      { runValidators: true, new: true }
    )
      .then((postData) => {
        if (!postData) {
          return res.status(404).json({ message: 'There is no post with this id' });
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete a response to a post
  deleteResponse(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { responses: { responseId: req.params.responseId } } },
      { runValidators: true, new: true }
    )
      .then((postData) => {
        if (!postData) {
          return res.status(404).json({ message: 'There is no post with this id' });
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = postControl;
