import express from 'express';
const router = express.Router();

import loginRoute from './auth/login.js';
router.use('/login', loginRoute);

import signupRoute from './auth/signup.js';
router.use('/signup', signupRoute);

import {jwtVerify} from '../../middleware.js';
router.get('/jwt-test', jwtVerify, (req, res) => {
    res.status(200).json(req.user);
});

export default router;