"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import BreadCrumbs from "../BreadCrumbs";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Ellipsis,
  EllipsisVertical,
  FilterIcon,
  LayoutDashboard,
  SearchIcon,
  Users,
} from "lucide-react";

const EmployeesTable = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ _id: null, name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/employee/get-all-employee"
      );
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
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });
      const newClient = await response.json();
      setClients((prev) => [...prev, newClient]);
      setFormData({ _id: null, name: "", email: "" });
      setIsModalOpen(false);
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/employee/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: formData._id,
          name: formData.name,
          email: formData.email,
        }),
      });
      setFormData({ _id: null, name: "", email: "" });
      setEditing(false);
      setIsModalOpen(false);
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/employee/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: clientId }),
      });
      setClients((prev) => prev.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEditClient = (client) => {
    setEditing(true);
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const displayedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" px-6 sm:px-12 flex flex-col  gap-12 ">
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

      <div className="flex flex-col gap-4">
        <div className="pr-5 space-x-4 w-full bg-accent cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full  p-2 pl-3"
          />
          <FilterIcon className="w-5 h-5 text-gray-500 mr-4" />
        </div>

        {/* Header Row */}
        <div className="w-full bg-accent rounded-xl border border-[#E0E1E6] overflow-hidden">
          <table className="w-full text-[#606475] border-separate  border-spacing-0 ">
            <thead>
              <tr>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Name
                </th>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Status
                </th>
                <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" ">
              {displayedClients.map((client) => (
                <tr key={client._id}>
                  <td className="flex items-center gap-4 p-4">
                    <img
                      src={client.avatar}
                      alt={`${client.name}'s avatar`}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm truncate text-[#1C2024]">
                        {client.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate text-[#1C2024]/80">
                        {client.email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className={` w-fit px-2 py-1 text-sm rounded text-center ${
                        client.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {client.status}
                    </div>
                  </td>
                  <td className="flex items-center gap-2 p-4">
                    <button
                      onClick={() => handleEditClient(client)}
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

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2 gap-4 text-[#1C2024]">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-4 py-2  bg-accent border border-[#E0E1E6] rounded-lg p-2 pl-3 focus:border-green-200 focus:ring-green-200 shadow-sm rounded disabled:opacity-50"
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
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-4 py-2 bg-accent border border-[#E0E1E6] rounded-lg p-2 pl-3 focus:border-green-200 focus:ring-green-200 shadow-sm rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
            <ArrowRightCircle />
          </button>
        </div>
      </div>

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
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              {editing ? (
                <button
                  onClick={handleUpdateClient}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAddClient}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;
