import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";
import toast from "react-hot-toast";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/projects", {
        headers: {
          Authorization: token
        }
      });

      setProjects(response.data);

    } catch (error) {
      console.log(error);
    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const createProject = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.post("/projects", formData, {
        headers: {
          Authorization: token
        }
      });

      setFormData({
        title: "",
        description: ""
      });

      fetchProjects();
      toast.success("Project created successfully");

    } catch (error) {

      console.log(error);

      toast.error("Project creation failed");

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white p-6 md:p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-black text-white tracking-wide">
          Projects
        </h1>

        <div className="flex flex-wrap gap-4">

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

        </div>

      </div>

      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Create Project
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white outline-none p-4 rounded-2xl"
          />

          <input
            type="text"
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white outline-none p-4 rounded-2xl"
          />

        </div>

        <button
          onClick={createProject}
          className="mt-5 bg-cyan-400 hover:bg-cyan-300 transition duration-300 text-black px-6 py-3 rounded-2xl font-black shadow-lg shadow-cyan-500/30"
        >
          Create Project
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 hover:-translate-y-2 hover:shadow-cyan-500/20 transition duration-300"
          >

            <h2 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Projects;