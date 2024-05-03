const { User, Thought } = require('../models');

// /api/users
// GET all users
const getUsers = async function(req, res) {
    try {
        const users = await User.find()
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

// POST a new user (username and email json)
const createUser = async function (req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// /api/users/:userId
// GET a single user by its _id and populated thought and friend data (subdocuments)
const getOneUser = async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId }).populate('friends', 'thoughts');

        if(!user) {
            return res.status(404).json({ message: 'No user found with that ID.' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// PUT to update a user by its _id
const updateUser = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if(!user) {
            res.status(404).json({ message: 'No user found with that ID.'});
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// DELETE a user by its _id
const deleteUser = async function (req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if(!user) {
            res.status(404).json({ message: 'No user found with that ID.'});
        }

        // Delete associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
    } catch (err) {
        res.status(500).json(err);
    }
};

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
const addFriend = async function(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        );

        if(!user) {
            res.status(404).json({ message: 'No user found with that ID.'});
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// DELETE to remove a friend from a user's friend list
const removeFriend = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID.' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getOneUser,
    updateUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
}