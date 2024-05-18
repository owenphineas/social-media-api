const User = require('../models/User.js');
const Thought = require('../models/Thought.js');
const Reaction = require('../models/Reaction.js');

// /api/thoughts
// GET all thoughts
const getThoughts = async function(req, res) {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// POST to create a new thought 
const postThought = async function (req, res) {
    try {
        const thought = await Thought.create(req.body);
        // Push created thought's _id to associated user's thoughts field array
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: {thoughts: thought._id } },
            { runValidators: true, new: true }
        );

        const response = {
            user: user,
            thought: thought
        };

        res.json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// /api/thoughts/:thoughtId
// GET a single thought by its _id
const getOneThought = async function (req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions');

        if(!thought) {
            res.status(404).json({ message: 'No thought found with that ID.'});
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};


// PUT to update a thought by its _id
const updateThought = async function (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if(!thought) {
            res.status(404).json({ message: 'No thought found with that ID.'})
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// DELETE a thought by its _id
const deleteThought = async function (req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID.' });
        }

        res.json({ message:"Thought Deleted!" });
    } catch (err) {
        res.status(500).json(err);
    }
};

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array
const addReaction = async function (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )

        if(!thought) {
            res.status(404).json({ message: 'No thought found with that ID.'});
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// /api/thoughts/:thoughtId/reactions/:reactionId
// DELETE to pull and remove a reaction by the reaction's reactionId value
const removeReaction = async function (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID.' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getThoughts,
    getOneThought,
    postThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};