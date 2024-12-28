import React, { useEffect, useState } from "react";
import axios from "axios";
import logoutIcon from "../assets/log-out.png";
import { useAuth } from "../contexts/AuthContext";
import TaskService from "../services/Task";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // const taskIndexQuery = TaskService.taskIndex();
  // console.log(taskIndexQuery);

  const { name, logout } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-8">
      <nav className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Task Management System</h1>
          <p>Hallo, {name}</p>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="flex gap-2 transition-all duration-200 active:scale-95 hover:opacity-80"
        >
          <img src={logoutIcon} />

          <p type="button" className="text-[#DC2626]">
            Keluar
          </p>
        </button>
      </nav>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">{task.deadline}</td>
              <td className="border px-4 py-2">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
