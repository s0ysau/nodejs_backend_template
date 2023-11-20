// require mongoose
const { Schema, model } = require('mongoose');
// require bcrypt
const bcrypt = require('bcrypt');

// SALT_ROUNDS
// This is the number of times bcrypt will run the salt or how much time is needed to calculate a single BCrypt hash. 
// The higher the number, the more secure the password will be and more difficult to brute-force, 
// but the longer it will take to hash the password.
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 10,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
}, {
    timestamps: true,
    toJSON: {
      transform (doc, ret) {
        delete ret.password;
        return ret;
      }
    }
});

userSchema.pre('save', async function (next) {
  // 'this' is user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
})

const User = model('User', userSchema);

module.exports = User;