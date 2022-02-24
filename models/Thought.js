const {
    Schema,
    Types,
    ObjectId,
    model
} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.format(now, 'HH:mm DD/MM/YYYY'),
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.format(now, 'HH:mm DD/MM/YYYY'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true
    }
});

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return reactions.length;
    })

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;