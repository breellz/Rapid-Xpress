import mongoose, { Schema, Model } from "mongoose";
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"


interface IUserModel extends Model<IUser> {
  findByCredentials: (
    email: string,
    password: string) => Promise<IUser>;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  avatar: Buffer;
  tokens: { token: string }[];
  generateAuthToken(): Promise<string>;
  findByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>(
  {

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!);

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_EMAIL_OR_PASSWORD");
  }

  return user;
};

//Hash plain password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export { User };
