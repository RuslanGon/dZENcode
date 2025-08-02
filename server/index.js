import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import startServer from './db.js';
import { createPost, deletePost, getAllPosts, getByOnePost, uploadPost } from './controllers/PostContloller.js';


dotenv.config(); 


const app = express();
app.use(express.json())
app.use(cors({origin: ['http://localhost:5173','https://dzencode-beta.vercel.app/'], 

credentials: true}))

// Post

app.get('/post', getAllPosts)
app.post('/post', createPost)
app.get('/post/:id', getByOnePost)
app.patch('/post/:id', uploadPost)
app.delete('/post/:id', deletePost)


startServer(app);