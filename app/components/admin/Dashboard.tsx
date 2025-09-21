"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setStats({
          users: typeof data.users === "number" ? data.users : 0,
          projects: typeof data.projects === "number" ? data.projects : 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ["Users", "Projects"],
    datasets: [
      {
        label: "Count",
        data: [stats.users, stats.projects],
        backgroundColor: ["#3B82F6", "#10B981"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Dashboard Statistics",
      },
    },
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <StatCard title="Total Users" value={(stats.users ?? 0).toString()} />
            <StatCard title="Projects" value={(stats.projects ?? 0).toString()} />
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow h-72 sm:h-96">
            <h3 className="text-lg font-semibold mb-4">Statistics Graph</h3>
            <div className="w-full h-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center sm:items-start">
      <h3 className="text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
