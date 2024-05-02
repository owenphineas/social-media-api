const { Schema, model } = require('mongoose');

// TO DO: import reactionSchema (?)

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        // TO DO: must be between 1 and 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now
        // TO DO: use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
        type: Schema.Types.ObjectId,
        ref: [ reactionSchema ],
        }
    ],
});

const Thought = mongoose.model('Thought', thoughtSchema);

// Retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = thoughtSchema;