import { RequestHandler } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // try {
  const { password, student: studentData } = req.body;
  // data validation using zod
  // const zodParseData = studentValidationSchema.parse(studentData);

  //will call service func to send this data
  const result = await UserService.createStudentIntoDB(password, studentData);

  // send response
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });
  // } catch (err) {
  //   // res.status(500).json({
  //   //   success: false,
  //   //   message: err.message || 'something went wrong',
  //   //   error: err,
  //   // });
  //   next(err);
  // }
});
export const UserController = {
  createStudent,
};
