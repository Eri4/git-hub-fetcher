import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error('Failed to fetch user profile');
    }
};