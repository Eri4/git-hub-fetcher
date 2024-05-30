import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import cron from 'node-cron';

const prisma = new PrismaClient();

const fetchCommits = async () => {
    try {
        const users = await prisma.user.findMany();

        for (const user of users) {
            const repositories = await prisma.repository.findMany({
                where: { userId: user.id },
            });

            for (const repo of repositories) {
                const repoOwner = repo.url.split('/').slice(-2, -1)[0];
                const repoName = repo.url.split('/').slice(-1)[0];

                const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                    params: {
                        per_page: 100,
                    },
                });

                const commits = response.data;

                const commitCount = commits.length;
                const date = new Date();

                await prisma.commit.create({
                    data: {
                        repositoryId: repo.id,
                        commitCount,
                        date,
                    },
                });
            }
        }

        console.log('Commit data fetched and stored successfully');
    } catch (error) {
        console.error('Error fetching commit data:', error);
    }
};

export const startCommitFetcher = () => {
    cron.schedule('* * * * *', fetchCommits);
};