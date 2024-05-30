import { Request, Response } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStarredRepositories = async (req: Request, res: Response) => {
    try {
        const accessToken = (req.user as any)?.accessToken;
        const response = await axios.get('https://api.github.com/user/starred', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const starredRepos = response.data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
        }));

        res.json(starredRepos);
    } catch (error) {
        console.error('Error fetching starred repositories:', error);
        res.status(500).json({ error: 'Failed to fetch starred repositories' });
    }
};

export const getCommits = async (req: Request, res: Response) => {
    try {
        const commits = await prisma.commit.findMany({
            where: {
                repository: {
                    userId: (req.user as any)?.id,
                },
            },
        });

        res.json(commits);
    } catch (error) {
        console.error('Error fetching commits:', error);
        res.status(500).json({ error: 'Failed to fetch commits' });
    }
};