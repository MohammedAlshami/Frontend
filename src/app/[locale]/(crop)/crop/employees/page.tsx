"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import { EllipsisVertical, Users } from "lucide-react";
import { FaUserPlus } from "react-icons/fa";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import Image from "next/image";
import { Card, Skeleton } from "@nextui-org/react";

const EmployeesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ _id: null, name: "", email: "" });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5000/v1/get-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "employee" }),
      });
      const data = await response.json();

      const formattedData = data.map((client) => ({
        _id: client._id,
        name: client.name,
        email: client.email,
        avatar: client.avatar || "/bg.png",
        status: client.status || "Active",
      }));

      setClients(formattedData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleAddClient = async () => {
    if (!formData.name || !formData.email) return;
    try {
      const response = await fetch("http://127.0.0.1:5000/v1/employee/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newClient = await response.json();
      setEmployees((prev) => [...prev, newClient]);
      setFormData({ _id: null, name: "", email: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      await fetch("http://127.0.0.1:5000/v1/employee/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({ _id: null, name: "", email: "" });
      setEditing(false);
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (_, row) => (
        <div className="flex items-center gap-4">
          <Image
            src={row.avatar}
            alt={`${row.name}'s avatar`}
            width={50}
            height={50}
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <p className="font-bold text-sm truncate text-[#1C2024]">
              {row.name}
            </p>
            <p className="text-sm text-gray-500 truncate">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (status) => (
        <div
          className={`w-fit px-2 py-1 text-sm rounded text-center ${
            status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
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

  return (
    <div className="px-6 sm:px-12 flex flex-col gap-12">
      <div className="flex justify-between">
        <BreadCrumbs
          title="Employees"
          icon={<Users className="text-icon w-8 h-8" />}
        />
        <button
          onClick={() => {
            setEditing(false);
            setFormData({ _id: null, name: "", email: "" });
            setIsModalOpen(true);
          }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaUserPlus />
          Add An Employee
        </button>
      </div>

      <DataTable
        isLoading={clients.length === 0}
        data={clients}
        columns={columns}
        searchKeys={["name", "email"]}
        itemsPerPage={3}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100000000]">
          <div className="bg-accent p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Employee" : "Add Employee"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-lg p-2 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
                onClick={editing ? handleUpdateClient : handleAddClient}
                className={`${
                  editing ? "bg-blue-500" : "bg-green-500"
                } text-white px-4 py-2 rounded-lg`}
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

export default EmployeesPage;
