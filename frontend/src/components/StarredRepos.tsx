import React from 'react';
import {Repository} from "../types/types.ts";

interface StarredReposProps {
    repositories: Repository[];
}

const StarredRepos: React.FC<StarredReposProps> = ({ repositories }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Starred Repositories</h2>
            {repositories.length === 0 ? (
                <p>No starred repositories found.</p>
            ) : (
                <ul className="space-y-4">
                    {repositories.map((repo) => (
                        <li key={repo.id}>
                            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {repo.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StarredRepos;