"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Days"); // "Days", "Weeks", "Months"

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      direction === "prev"
        ? subMonths(currentDate, 1)
        : addMonths(currentDate, 1)
    );
  };

  // Get all days for the current month
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end }).map((date) => ({
      day: date.getDate(),
      isCurrentMonth: isSameMonth(date, currentDate),
    }));
  };

  const renderCalendarContent = () => {
    switch (view) {
      case "Days":
        return (
          <div className="grid grid-cols-7 gap-0">
            {getDaysInMonth().map(({ day, isCurrentMonth }, index) => (
              <DayItem key={index} day={day} isCurrentMonth={isCurrentMonth} />
            ))}
          </div>
        );
      case "Weeks":
        // Placeholder for weeks view
        return (
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="p-4 border border-indigo-200 rounded-lg">
                Week {i + 1}
              </div>
            ))}
          </div>
        );
      case "Months":
        // Placeholder for months view
        return (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="p-4 border border-indigo-200 rounded-lg text-center"
              >
                {format(new Date(currentDate.getFullYear(), i), "MMM")}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-accent flex flex-col bg-stone-50 border-2 border-black-600/60 p-8 rounded-lg w-full border border-[#E0E1E6] shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-5">
          <button
            className="flex items-center justify-center bg-accent w-10 h-10 rounded-full border border-indigo-200"
            aria-label="Previous Month"
            onClick={() => navigateMonth("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5 h-5 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.25 19.25L8.75 12l6.5-7.25"
              />
            </svg>
          </button>
          <div>
            <h6 className="text-xl font-medium text-black mb-0.5">
              {format(currentDate, "MMMM yyyy")}
            </h6>
            <p className="text-sm font-normal text-gray-600">
              {format(currentDate, "EEEE, MMM d")}
            </p>
          </div>
          <button
            className="flex items-center justify-center bg-accent w-10 h-10 rounded-full border border-indigo-200"
            aria-label="Next Month"
            onClick={() => navigateMonth("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5 h-5 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.75 4.75l6.5 7.25-6.5 7.25"
              />
            </svg>
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          {["Days", "Months", "Weeks"].map((label) => (
            <button
              key={label}
              onClick={() => setView(label)}
              className={`py-2.5 px-4 rounded-lg text-sm font-medium ${
                label === view ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {renderCalendarContent()}
    </section>
  );
};

const DayItem = ({
  day,
  isCurrentMonth,
}: {
  day: number;
  isCurrentMonth: boolean;
}) => (
  <div
    className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 ${
      isCurrentMonth
        ? "bg-accent cursor-pointer hover:bg-indigo-50"
        : "bg-gray-50"
    } border-r border-b border-indigo-200 transition-all duration-300`}
  >
    <span
      className={`text-xs font-semibold ${
        isCurrentMonth ? "text-gray-900" : "text-gray-400"
      }`}
    >
      {day}
    </span>
  </div>
);

export default Calendar;
