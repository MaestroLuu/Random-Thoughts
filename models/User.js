const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(email) {
                return  /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z]{2,6})$/.test(email);
            },
            message: "This is not a valid email."
        },
      },
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
      friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
);
  
userSchema
    .virtual('friendCount')
    .get(function () {
      if (this.friends) {
        return this.friends.length;
      } else {
        return 0;
      }
    });

const User = model('User', userSchema);  
module.exports = User;
