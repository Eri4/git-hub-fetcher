import express from 'express';
import cors from 'cors';
import passport from './config/passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import repositoryRoutes from './routes/repositoryRoutes';
import {authMiddleware} from "./middleware/authMiddleware";

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((err: any, req: any, res: any, next: any) => {
    console.error('test 1',err.stack);
    res.status(500).send('Internal Server Error');
});

app.use('/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/repositories', authMiddleware, repositoryRoutes);

export default app;