import React from 'react';
import {loginWithGitHub} from "../../services/authService.ts";

const Home: React.FC = () => {

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to GitHub Fetcher</h1>
            <button
                onClick={loginWithGitHub}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Login with GitHub
            </button>
        </div>
    );
};

export default Home;