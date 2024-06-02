import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TStudent,
  StudentModel,
  TUserName,
  TLocalGuardian,
} from './student.interface';
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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    //this is for static method
    id: {
      type: String,
      required: [true, 'student id is required and should be unique'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  // when i add mongoose virtual then i need this to add
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // },
);
// mongoose virtual apply
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// =>create a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
//==>Query middleware ->get all student from db but before apply one query that deleted student is not show in user site
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// =>this work for findOne and this relation is related to student.service.ts
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// =>this work for aggregate and this relation is related to student.service.ts
// studentSchema.pre('aggregate', function (next) {
// this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
//   next();
// });

// =>create a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
