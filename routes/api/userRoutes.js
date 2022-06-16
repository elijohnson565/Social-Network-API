const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
  addAFriend,
  removeAFriend,
} = require('../../controllers/userControl');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:userId').get(getOneUser).put(updateExistingUser).delete(deleteExistingUser);

router.route('/:userId/friends/:friendId').post(addAFriend).delete(removeAFriend);

module.exports = router;
