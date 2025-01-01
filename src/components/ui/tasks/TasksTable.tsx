"use client";

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import BreadCrumbs from "../BreadCrumbs";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  EllipsisVertical,
  FilterIcon,
  LayoutDashboard,
  SearchIcon,
  ClipboardList,
} from "lucide-react";

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    employees: [],
    priority: "",
    startDate: "",
    deadline: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/task/get-all-task"
      );
      const data = await response.json();

      const formattedData = data.map((task) => ({
        _id: task._id,
        name: task.name,
        employees: task.employees || [],
        priority: task.priority || "Medium",
        startDate: task.startDate
          ? new Date(task.startDate).toISOString().split("T")[0]
          : "",
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().split("T")[0]
          : "",
        status: task.status || "Pending",
      }));

      setTasks(formattedData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/employee/get-all-employee"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddTask = async () => {
    if (
      !formData.name ||
      !formData.employees.length ||
      !formData.priority ||
      !formData.startDate ||
      !formData.deadline
    )
      return;

    const { _id, ...dataToSend } = formData;

    try {
      const response = await fetch("http://127.0.0.1:5000/v1/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      await response.json();
      setIsModalOpen(false);
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/task/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsModalOpen(false);
      setEditing(false);
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/task/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: taskId }),
      });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditing(true);
    setFormData(task);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "employees") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => ({
          _id: option.value,
          name: option.text,
        })
      );
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      employees: [],
      priority: "",
      startDate: "",
      deadline: "",
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const displayedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between">
        <BreadCrumbs
          title="Tasks"
          icon={<ClipboardList className="text-[#60646C] w-8 h-8" />}
        />
        <button
          onClick={() => {
            setEditing(false);
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add A Task
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className=" pr-5 space-x-4 w-full bg-white cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-3"
          />
          <FilterIcon className="w-5 h-5 text-gray-500 " />
        </div>

        <div className="w-full bg-white rounded-xl border border-[#E0E1E6] overflow-auto">
          <table className="w-full text-[#606475] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Task Name
                </th>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Assigned Employees
                </th>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Priority
                </th>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Timeline
                </th>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks.map((task) => (
                <tr key={task._id}>
                  <td className="p-4">
                    <p className="font-bold text-sm truncate text-[#1C2024]">
                      {task.name}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {task.employees.map((emp) => (
                        <span
                          key={emp._id}
                          className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs"
                        >
                          {emp.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`w-fit px-2 py-1 text-sm rounded ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-[#1C2024]/80">
                      <p>Start: {task.startDate}</p>
                      <p>Due: {task.deadline}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="text-gray-500 hover:text-teal-600"
                    >
                      <EllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4 space-x-2 gap-4 text-[#1C2024]">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-4 py-2 bg-white border border-[#E0E1E6] rounded-lg p-2 pl-3 focus:border-green-200 focus:ring-green-200 shadow-sm rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ArrowLeftCircle />
            Prev
          </button>
          <span className="w-full sm:w-auto">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-4 py-2 bg-white border border-[#E0E1E6] rounded-lg p-2 pl-3 focus:border-green-200 focus:ring-green-200 shadow-sm rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowRightCircle />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100000000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Task" : "Add Task"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              />
              <select
                name="employees"
                multiple
                value={formData.employees.map((emp) => emp._id)}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2 h-32"
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={editing ? handleUpdateTask : handleAddTask}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg"
              >
                {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTable;
