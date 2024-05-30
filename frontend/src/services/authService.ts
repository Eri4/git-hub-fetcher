import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const loginWithGitHub = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
};

export const logoutUser = async () => {
    try {
        await axios.post(`${API_BASE_URL}/auth/logout`);
        window.location.href = '/';
    } catch (error) {
        console.error('Error logging out:', error);
    }
};