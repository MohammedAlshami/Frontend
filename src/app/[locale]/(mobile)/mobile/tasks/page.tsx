"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ActivityTracker = () => {
  const router = useRouter();

  // Get current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "en-US",
    { month: "short" }
  )}`;

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(formattedDate);

  // Generate dynamic week days
  const generateWeekDays = () => {
    const weekDays = [];
    const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Get Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayName = weekDayNames[day.getDay()];
      const dayDate = `${day.getDate()} ${day.toLocaleString("en-US", {
        month: "short",
      })}`;
      weekDays.push({ day: dayName, date: dayDate });
    }
    return weekDays;
  };

  const weekDays = generateWeekDays();

  // Sample tasks
  const tasks = [
    {
      id: 1,
      date: formattedDate,
      time: "07:00-09:00",
      title: "Inspect Pineapple Fields",
      tags: ["Inspection", "Pineapples"],
      participants: [
        "https://media.istockphoto.com/id/1498903496/photo/farmer-standing-at-field.jpg?s=612x612&w=0&k=20&c=6ZNt08eOGUyurfh_YGFuqXk6RzRR4aI3VqGSNVPxZF4=",
        "https://media.istockphoto.com/id/1498903496/photo/farmer-standing-at-field.jpg?s=612x612&w=0&k=20&c=6ZNt08eOGUyurfh_YGFuqXk6RzRR4aI3VqGSNVPxZF4=",
      ],
    },
    {
      id: 2,
      date: formattedDate,
      time: "10:00-12:00",
      title: "Harvest Ripe Pineapples",
      tags: ["Harvesting", "Pineapples"],
      participants: [
        "https://media.istockphoto.com/id/1498903496/photo/farmer-standing-at-field.jpg?s=612x612&w=0&k=20&c=6ZNt08eOGUyurfh_YGFuqXk6RzRR4aI3VqGSNVPxZF4=",
        "https://media.istockphoto.com/id/1498903496/photo/farmer-standing-at-field.jpg?s=612x612&w=0&k=20&c=6ZNt08eOGUyurfh_YGFuqXk6RzRR4aI3VqGSNVPxZF4=",
      ],
    },
  ];

  // Filter tasks by selected date
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-12">
      <div className="flex-1 p-4 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://media.istockphoto.com/id/1498903496/photo/farmer-standing-at-field.jpg?s=612x612&w=0&k=20&c=6ZNt08eOGUyurfh_YGFuqXk6RzRR4aI3VqGSNVPxZF4="
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-base font-semibold">Farmer Alex</h2>
              <span className="inline-block bg-yellow-100 px-2 py-1 rounded-full">
                <span className="text-yellow-800 text-xs">PRO</span>
              </span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">{selectedDate}</h2>
            <div className="flex gap-2">
              <button className="hover:bg-gray-100 p-1 rounded-full">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="hover:bg-gray-100 p-1 rounded-full">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            {weekDays.map((item) => (
              <div
                key={item.day}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedDate(item.date)}
              >
                <span className="text-xs text-gray-500 mb-1">{item.day}</span>
                <div
                  className={`w-8 h-8 flex rounded-full items-center justify-center ${
                    item.date === selectedDate ? "bg-black" : ""
                  }`}
                >
                  <span
                    className={`text-sm ${
                      item.date === selectedDate ? "text-white" : "text-black"
                    }`}
                  >
                    {item.date.split(" ")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">
              Tasks for {selectedDate}
            </h2>
          </div>

          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex gap-4 mb-4"
              onClick={() => {
                router.push("/en/mobile/tasks/details");
              }}
            >
              <div className="flex flex-col justify-center bg-gray-900 p-2 px-4 rounded-xl items-center">
                <span className="text-white text-lg font-bold">
                  {task.date.split(" ")[0]}
                </span>
                <span className="text-white text-xs">
                  {task.date.split(" ")[1]}
                </span>
              </div>

              <div className="flex-1 bg-white hover:bg-gray-100 cursor-pointer p-4 rounded-xl transition-colors">
                <span className="text-sm text-gray-500">{task.time}</span>
                <h3 className="text-sm font-semibold my-2">{task.title}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full ${
                          tag === "Inspection"
                            ? "bg-blue-100 text-blue-600"
                            : tag === "Harvesting"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        <span className="text-xs">{tag}</span>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    {task.participants.map((participant, index) => (
                      <img
                        key={index}
                        src={participant}
                        alt={`Participant ${index + 1}`}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ marginLeft: index > 0 ? "-10px" : "0" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!filteredTasks.length && (
            <p className="text-sm text-gray-500">No tasks for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;
