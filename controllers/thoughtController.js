const { User, Thought } = require('../models');

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
        // TO DO: push created thought's _id to associated user's thoughts field array)
        const thought = await Thought.create(req.body);
        res.json(user);
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

        res.json(user);
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

        // Delete associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
    } catch (err) {
        res.status(500).json(err);
    }
};

// /api/thoughts/:thoughtId/reactions
// TO DO: POST to create a reaction stored in a single thought's reactions array
const addReaction = async function (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            // Do something here
        )

        if(!thought) {
            res.status(404).json({ message: 'No thought found with that ID.'});
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

// /api/thoughts/:thoughtId/reactions/:reactionId
// DELETE to pull and remove a reaction by the reaction's reactionId value
const removeReaction = async function (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
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