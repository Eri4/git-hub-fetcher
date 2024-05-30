import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const getStarredRepositories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/repositories/starred`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching starred repositories:', error);
        throw new Error('Failed to fetch starred repositories');
    }
};

export const getCommits = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/repositories/commits`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching commits:', error);
        throw error;
    }
};