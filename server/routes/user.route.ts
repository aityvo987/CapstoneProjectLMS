import express from 'express';
import {
    activateUser,
    registrationUser,
    loginUser,
    logoutUser,
    updateAccessToken,
    getUserInfo,
    socialAuth,
    upateUserInfo,
} from '../controllers/user.controller';

import {authorizeRoles,isAutheticated} from '../middleware/auth';

const userRouter = express.Router();

//navigation 
userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', isAutheticated,logoutUser);

userRouter.get('/refresh', updateAccessToken);

userRouter.get('/user',isAutheticated, getUserInfo);

userRouter.post('/social-auth' ,socialAuth);

userRouter.put('/update-user-info',isAutheticated, upateUserInfo);

export default userRouter;
