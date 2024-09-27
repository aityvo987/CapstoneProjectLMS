import express from 'express';
import { activateUser, registrationUser, loginUser, logoutUser } from '../controllers/user.controller';

const userRouter = express.Router();

//navigation 
userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);


export default userRouter;
