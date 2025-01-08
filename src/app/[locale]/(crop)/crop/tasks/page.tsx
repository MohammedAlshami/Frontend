"use client";

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { ClipboardList, SearchIcon, FilterIcon, EllipsisVertical } from "lucide-react";
import DataTable from "@/components/ui/DataTable";

import {Card, Skeleton} from "@nextui-org/react";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://duk8eezkki.execute-api.ap-southeast-1.amazonaws.com/main/v1/get-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "task" }),
      });
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
      const response = await fetch("https://duk8eezkki.execute-api.ap-southeast-1.amazonaws.com/main/v1/get-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "employee" }),
      });
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

    try {
      const response = await fetch("https://duk8eezkki.execute-api.ap-southeast-1.amazonaws.com/main/v1/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      await fetch("https://duk8eezkki.execute-api.ap-southeast-1.amazonaws.com/main/v1/task/update", {
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

  const columns = [
    {
      key: "name",
      header: "Task Name",
      render: (_, row) => (
        <p className="font-bold text-sm truncate">{row.name}</p>
      ),
    },
    {
      key: "employees",
      header: "Assigned Employees",
      render: (employees) => (
        <div className="flex flex-wrap gap-1">
          {employees.map((emp) => (
            <span
              key={emp._id}
              className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs"
            >
              {emp.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (priority) => (
        <div
          className={`w-fit px-2 py-1 text-sm rounded ${getPriorityColor(
            priority
          )}`}
        >
          {priority}
        </div>
      ),
    },
    {
      key: "timeline",
      header: "Timeline",
      render: (_, row) => (
        <div className="text-sm">
          <p>Start: {row.startDate}</p>
          <p>Due: {row.deadline}</p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
        <button
          onClick={() => {
            setEditing(true);
            setFormData(row);
            setIsModalOpen(true);
          }}
          className="text-gray-500 hover:text-teal-600"
        >
          <EllipsisVertical />
        </button>
      ),
    },
  ];

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
    <div className="px-6 sm:px-12 flex flex-col gap-12">
      <div className="flex justify-between">
        <BreadCrumbs
          title="Tasks"
          icon={<ClipboardList className="text-icon w-8 h-8" />}
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


      <DataTable
      isLoading={tasks.length === 0}
        data={tasks}
        columns={columns}
        searchKeys={["name", "priority"]}
        itemsPerPage={3}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100000000]">
          <div className="bg-accent p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Task" : "Add Task"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <select
              name="employees"
              multiple
              value={formData.employees.map((emp) => emp._id)}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            >
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="priority"
              placeholder="Priority (High, Medium, Low)"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
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

export default TasksPage;
