export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'active' | 'blocked';
};
// export type NewUser = {
//   id: string;
//   password: string;
//   role: string;
// };
