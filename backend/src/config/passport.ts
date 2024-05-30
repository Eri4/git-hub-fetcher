import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: 'http://localhost:4000/auth/github/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {

            try {
                let user = await prisma.user.findUnique({
                    where: { githubId: profile.id },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            githubId: profile.id,
                            username: profile.username,
                            accessToken,
                        },
                    });
                } else {

                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { accessToken },
                    });

                }

                done(null, user);
            } catch (error) {
                console.error('Error during authentication:', error);
                done(error);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;