import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.routes';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());
// application route
app.use('/api/v1/students', StudentRoutes);

// const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.url, req.method);
//   next();
// };
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
