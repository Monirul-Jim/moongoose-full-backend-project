import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     // data validation using zod
//     const zodParseData = studentValidationSchema.parse(studentData);

//     //will call service func to send this data
//     const result = await StudentServices.createStudentIntoDB(zodParseData);

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    // res.status(200).json({
    //   success: true,
    //   message: 'Student are retrieve successfully',
    //   data: result,
    // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student are retrieve successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // res.status(200).json({
    //   success: true,
    //   message: 'Single Student are retrieve successfully',
    //   data: result,
    // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Student are retrieve successfully',
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'something went wrong',
    //   error: err,
    // });
    next(err);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    // res.status(200).json({
    //   success: true,
    //   message: 'Student deleted successfully',
    //   data: result,
    // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'something went wrong',
    //   error: err,
    // });
    next(err);
  }
};
export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
