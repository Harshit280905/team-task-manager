import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";
import toast from "react-hot-toast";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    priority: "medium"
  });

  useEffect(() => {

    fetchTasks();
    fetchProjects();

  }, []);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: token
        }
      });

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

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

  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post(
        "/tasks",
        {
          ...formData,
          assignedTo: user._id
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      setFormData({
        title: "",
        description: "",
        projectId: "",
        priority: "medium"
      });

      fetchTasks();
      toast.success("Task created successfully");

    } catch (error) {

      console.log(error);

      toast.error("Task creation failed");

    }

  };

  const updateTaskStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchTasks();
      toast.success("Task updated successfully");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white p-6 md:p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-black text-white tracking-wide">
          Tasks
        </h1>

        <Link
          to="/dashboard"
          className="bg-cyan-500 hover:bg-cyan-400 transition duration-300 text-black px-5 py-3 rounded-2xl font-bold shadow-lg shadow-cyan-500/30"
        >
          Dashboard
        </Link>

      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Create Task
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white outline-none p-4 rounded-2xl"
          />

          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white outline-none p-4 rounded-2xl"
          />

          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white outline-none p-4 rounded-2xl"
          >

            <option value="">
              Select Project
            </option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}

          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 focus:border-cyan-400 text-white outline-none p-4 rounded-2xl"
          >

            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>

          </select>

        </div>

        <button
          onClick={createTask}
          className="mt-5 bg-cyan-500 hover:bg-cyan-400 transition duration-300 text-black px-6 py-3 rounded-2xl font-bold shadow-lg shadow-cyan-500/30"
        >
          Create Task
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 hover:-translate-y-2 hover:shadow-cyan-500/20 transition duration-300"
          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-2xl font-bold text-white">
                {task.title}
              </h2>

              <span className="bg-cyan-500/20 text-cyan-300 px-4 py-1 rounded-full text-sm font-bold border border-cyan-400/20">
                {task.status}
              </span>

            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
              {task.description}
            </p>

            <div className="flex justify-between items-center">

              <p className="text-sm font-semibold text-cyan-300">
                Priority: {task.priority}
              </p>

              <select
                value={task.status}
                onChange={(e) =>
                  updateTaskStatus(task._id, e.target.value)
                }
                className="bg-[#0f172a] border border-gray-700 text-white rounded-xl px-3 py-2 outline-none"
              >

                <option value="todo">Todo</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>

              </select>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Tasks;