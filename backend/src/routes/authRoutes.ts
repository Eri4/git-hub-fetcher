import express from 'express';
import { loginWithGitHub, githubCallbackHandler } from '../controllers/authController';
import passport from "passport";

const router = express.Router();

router.get('/github', loginWithGitHub);

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    githubCallbackHandler
);

export default router;