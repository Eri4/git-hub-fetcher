import passport from 'passport';
import {PrismaClient} from "@prisma/client";
import { Request, Response } from 'express';
import axios from "axios";

const prisma = new PrismaClient();

export const loginWithGitHub = passport.authenticate('github', {
    scope: ['user:email', 'repo'],
});

export const githubCallbackHandler = async (req: Request, res: Response) => {
    try {

        const user = (req as any).user;

        if (!user) {
            throw new Error('User not found');
        }

        // Fetch the user's starred repositories
        const starredReposResponse = await axios.get('https://api.github.com/user/starred', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });

        const starredRepos = starredReposResponse.data.map((repo: any) => ({
            id: repo.id.toString(),
            name: repo.name,
            url: repo.html_url,
            userId: user.id,
        }));

        // Store the starred repositories in the database
        await prisma.repository.createMany({
            data: starredRepos,
            skipDuplicates: true,
        });

        // Fetch and store the commits for each starred repository
        for (const repo of starredRepos) {

            const commitsResponse = await axios.get(`https://api.github.com/repos/${repo.url.split('/').slice(-2).join('/')}/commits`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
                params: {
                    per_page: 100,
                },
            });

            const commits = commitsResponse.data.map((commit: any) => ({
                repositoryId: repo.id,
                commitCount: commitsResponse.data.length,
                date: new Date(),
            }));

            await prisma.commit.createMany({
                data: commits,
            });
        }

        res.redirect('http://localhost:8080/dashboard');
    } catch (error) {
        console.error('Error during GitHub callback:', error);
        res.status(500).json({ error: 'Failed to process GitHub callback' });
    }
};