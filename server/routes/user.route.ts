import express from 'express';
import {registrationUser} from '../controllers/user.controller';

const userRouter = express.Router();

//navigation 
userRouter.post('/registration',registrationUser);

export default userRouter;
