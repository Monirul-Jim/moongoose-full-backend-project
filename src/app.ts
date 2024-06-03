/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.routes';
import { UserRoutes } from './app/modules/user/user.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());
// application route
app.use('/api/v1', router);

// const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.url, req.method);
//   next();
// };
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
// Not Found
app.use(notFound);
export default app;
// start ph university part 2
