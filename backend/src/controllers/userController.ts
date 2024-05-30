import { Request, Response } from 'express';
import axios from 'axios';

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const accessToken = (req.user as any)?.accessToken;
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const { login, name, avatar_url, html_url } = response.data;

        res.json({
            username: login,
            name,
            avatarUrl: avatar_url,
            profileUrl: html_url,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};