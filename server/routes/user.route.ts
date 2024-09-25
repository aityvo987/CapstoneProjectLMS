import express from 'express';
import { activateUser, registrationUser } from '../controllers/user.controller';

const userRouter = express.Router();

//navigation 
userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);


export default userRouter;
