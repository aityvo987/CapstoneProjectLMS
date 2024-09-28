import express from 'express';
import {
    activateUser,
    registrationUser,
    loginUser,
    logoutUser
} from '../controllers/user.controller';

import {isAutheticated} from '../middleware/auth';

const userRouter = express.Router();

//navigation 
userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', isAutheticated,logoutUser);


export default userRouter;
