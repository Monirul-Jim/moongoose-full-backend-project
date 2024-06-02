import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // password: {
    //   type: String,
    //   required: [true, 'student password required '],
    //   maxLength: [20, 'password cannot be more than 20 character'],
    // },
  },
  {
    timestamps: true,
  },
);
// ===>pre save middleware/hook ==> here i use this for hash the password to the database
userSchema.pre('save', async function (next) {
  // hashing password and save into database
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
//===> post middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});
export const User = model<TUser>('User', userSchema);
