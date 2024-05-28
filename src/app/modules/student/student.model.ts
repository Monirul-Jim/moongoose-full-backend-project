import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TStudent,
  StudentModel,
  TUserName,
  TLocalGuardian,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [
      true,
      'first name is required and first letter should be capital',
    ],
  },
  middleName: {
    type: String,
  },
  lastName: { type: String, required: [true, 'last name is required'] },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'father contact number is required'],
  },
  motherName: { type: String, required: [true, 'mother name  is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'mother contact number is required'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'local guardian is required'] },
  occupation: {
    type: String,
    required: [true, 'local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'local guardian contact no is required'],
  },
  address: {
    type: String,
    required: [true, 'local guardian address is required'],
  },
});
// const studentSchema = new Schema<TStudent, StudentModel, studentMethods>({ //this is instance method for use
const studentSchema = new Schema<TStudent, StudentModel>({
  //this is for static method
  id: {
    type: String,
    required: [true, 'student id is required and should be unique'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'student password required '],
    unique: true,
    maxLength: [20, 'password cannot be more than 20 character'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'student name is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'student gender  is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'student email is required and should be unique'],
    unique: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  contactNumber: {
    type: String,
    required: [true, 'student contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergency contact number is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian info is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local guardian info is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanent address is required'],
  },
  presentAddress: { type: String },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});
// ===>pre save middleware/hook ==> here i use this for hash the password to the database
studentSchema.pre('save', async function (next) {
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
studentSchema.post('save', function () {
  console.log(this, 'post hook : we will save our data');
});
// =>create a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// =>create a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
