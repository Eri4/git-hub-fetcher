import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {Commit, Repository} from "../types/types.ts";

Chart.register(...registerables);

interface CommitChartProps {
    commits: Commit[];
    repositories: Repository[];
}

const CommitChart: React.FC<CommitChartProps> = ({ commits, repositories }) => {
    const getChartData = () => {
        const data: { [key: string]: { commitCounts: number[]; dates: string[] } } = {};

        repositories.forEach((repo) => {
            data[repo.name] = { commitCounts: [], dates: [] };
        });

        commits.forEach((commit) => {
            const repoName = repositories.find((repo) => repo.id == commit.repositoryId)?.name;
            if (repoName) {
                data[repoName].commitCounts.push(commit.commitCount);
                data[repoName].dates.push(new Date(commit.date).toLocaleDateString());
            }
        });

        return data;
    };

    const chartData = getChartData();

    const datasets = Object.keys(chartData).map((repoName, index) => ({
        label: repoName,
        data: chartData[repoName].commitCounts,
        fill: false,
        borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
        tension: 0.1,
    }));

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Commit Count',
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Commit Chart</h2>
            <div className="w-full">
                <Line
                    data={{
                        labels: chartData[Object.keys(chartData)[0]]?.dates || [],
                        datasets: datasets,
                    }}
                    options={chartOptions}
                />
            </div>
        </div>
    );
};

export default CommitChart;