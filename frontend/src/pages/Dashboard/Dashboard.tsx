import React, { useEffect, useState } from 'react';
import Profile from "../../components/Profile";
import StarredRepos from "../../components/StarredRepos";
import CommitChart from "../../components/CommitChart";
import { getCommits, getStarredRepositories } from "../../services/repositoryService";
import { getUserProfile } from "../../services/userService";
import {Commit, Repository, User} from "../../types/types.ts";


const Dashboard: React.FC = () => {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [commitsData, reposData, userData] = await Promise.all([
                    getCommits(),
                    getStarredRepositories(),
                    getUserProfile(),
                ]);
                setCommits(commitsData);
                setRepositories(reposData);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            {error && <div className="text-red-500">{error}</div>}
            {user && <Profile user={user} />}
            {repositories.length > 0 && <StarredRepos repositories={repositories} />}
            {commits.length > 0 && <CommitChart commits={commits} repositories={repositories} />}
        </div>
    );
};

export default Dashboard;