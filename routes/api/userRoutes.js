const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    updateUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends 
router.route('/:userId/friends').post(addFriend);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;