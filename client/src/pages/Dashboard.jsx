import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/dashboard", {
        headers: {
          Authorization: token
        }
      });

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }

  };

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      color: "text-blue-600"
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      color: "text-green-600"
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      color: "text-yellow-500"
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      color: "text-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white p-6 md:p-10">

      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h1 className="text-5xl font-black text-white tracking-wide">
            Dashboard
          </h1>

          <p className="text-gray-300 mt-2 text-lg">
            Welcome back, {user?.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">

          <Link
            to="/dashboard"
            className="bg-cyan-400 hover:bg-cyan-300 transition duration-300 text-black px-5 py-3 rounded-2xl font-black shadow-lg shadow-cyan-500/30"
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="bg-purple-500 hover:bg-purple-400 transition duration-300 text-white px-5 py-3 rounded-2xl font-black shadow-lg shadow-purple-500/30"
          >
            Projects
          </Link>

          <Link
            to="/tasks"
            className="bg-green-500 hover:bg-green-400 transition duration-300 text-black px-5 py-3 rounded-2xl font-black shadow-lg shadow-green-500/30"
          >
            Tasks
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-400 transition duration-300 text-white px-5 py-3 rounded-2xl font-black shadow-lg shadow-red-500/30"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:shadow-cyan-500/20 transition duration-300"
          >

            <p className="text-gray-300 text-lg mb-3">
              {card.title}
            </p>

            <h2 className={`text-5xl font-black ${card.color}`}>
              {card.value}
            </h2>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;