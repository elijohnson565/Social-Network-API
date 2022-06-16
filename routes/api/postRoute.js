const router = require('express').Router();
const {
  getPosts,
  getOnePost,
  createPost,
  updateAPost,
  deleteAPost,
  createResponse,
  deleteResponse,
} = require('../../controllers/postControl');

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getOnePost).put(updateAPost).delete(deleteAPost);

router.route('/:postId/responses').post(createResponse);

router.route('/:postId/responses/:responseId').delete(deleteResponse);

module.exports = router;
