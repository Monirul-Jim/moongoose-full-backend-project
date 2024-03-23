import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.routes';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());
app.use('/api/v1/students', StudentRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});
export default app;
