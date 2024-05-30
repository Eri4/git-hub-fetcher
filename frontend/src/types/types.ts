export interface Commit {
    id: string;
    repositoryId: string;
    commitCount: number;
    date: string;
}

export interface Repository {
    id: string;
    name: string;
    url: string;
}

export interface User {
    username: string;
    name: string;
    avatarUrl: string;
    profileUrl: string;
}