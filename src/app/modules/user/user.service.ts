import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // ->if password is not give use default password
  userData.password = password || (config.default_password as string);
  // if (!password) {
  //   User.password = config.default_password as string;
  // }
  // else {
  //   user.password=password
  // }
  // set role
  userData.role = 'student';
  // set manually generated id
  userData.id = '203010001';
  // create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //ref id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};
export const UserService = { createStudentIntoDB };
