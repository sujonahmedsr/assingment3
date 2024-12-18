import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { blogController } from './app/module/Blog Model/blog.Controller';
import blogRouter from './app/module/Blog Model/blog.Router';
const app = express();


// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());


// api end points 
app.use('/api/blogs', blogRouter)



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