const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Format the timestamp on query
        get: v => v.toString()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
        type: Schema.Types.ObjectId,
        ref: [reactionSchema],
        }
    ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

const Thought = model('thought', thoughtSchema);

// Retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thought;