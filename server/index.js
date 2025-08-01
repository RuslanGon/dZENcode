import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors'
import startServer from './db.js';
import { getAllPosts } from './controllers/PostContloller.js';


dotenv.config(); 

const app = express();
app.use(express.json())
app.use(cors())

// Post

app.use('/post', getAllPosts)




startServer(app);