const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            // TO DO: Use mongoose's ObjectId type
            // TO DO: Set default value to a new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            // TO DO: 280 character maximum
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TO DO: use getter method to format the timestamp on query
        },
    }
)