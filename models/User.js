const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Checks whether email is properly formatted
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: [ this ],
            }
        ]
    }
);

const User = mongoose.model('User', userSchema);

// Retrieves the length of the 'friends' array
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = userSchema;