import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();


// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    })
})

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
      status: false,
      message: 'Route not found'
    })
  })

export default app