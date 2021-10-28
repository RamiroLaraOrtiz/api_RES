import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import { createRoles } from "./libs/initSetup";

import games from './routes/games.routes';
import users from './routes/user.routes';
import authRoutes from './routes/auth.route';
 
const app = express();
createRoles();
app.set('pkg',pkg)
app.use(morgan('dev'));
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        author: app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version
    });
});
app.use('/api/games',games)

app.use('/api/users',users)
app.use('/api/auth',authRoutes)
export default app;