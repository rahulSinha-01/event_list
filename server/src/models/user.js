import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
});

//run just before saving the user model
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (currentPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(currentPassword, this.password, (err, isMathched) => {
      if (err) {
        return reject(err);
      }
      if (!isMathched) {
        return reject(false);
      } else {
        return resolve(true);
      }
    });
  });
};

export default mongoose.model("users", userSchema);
