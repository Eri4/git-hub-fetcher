import React from 'react';
import {User} from "../types/types.ts";

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="flex items-center mb-4">
                <img src={user.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <p className="text-xl font-bold">{user.username}</p>
                    <p className="text-gray-600">{user.name}</p>
                </div>
            </div>
            <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View GitHub Profile
            </a>
        </div>
    );
};

export default Profile;