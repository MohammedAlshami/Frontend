import React from "react";
import Calendar from "./CalendarComponent";

const EventCard = ({ event }: { event: Event }) => (
  <div className="p-6 rounded-xl border-2 border-black/5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <span className={`w-2.5 h-2.5 rounded-full ${event.color}`}></span>
        <p className="text-base font-medium text-gray-900">{event.date}</p>
      </div>
      <div className="dropdown relative inline-flex">
        <button
          type="button"
          data-target={`dropdown-${event.id}`}
          className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="4"
            viewBox="0 0 12 4"
            fill="none"
          >
            <path
              d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <div
          id={`dropdown-${event.id}`}
          className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden"
        >
          <ul className="py-2">
            <li>
              <a
                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                href="#"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                href="#"
              >
                Remove
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h6 className="text-xl leading-8 font-semibold text-black mb-1">
      {event.title}
    </h6>
    <p className="text-base font-normal text-gray-600">{event.description}</p>
  </div>
);

const CalendarUI = () => {
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: i >= 5 && i < 27,
  }));

  const events: Event[] = [
    {
      id: 1,
      date: "Jan 10, 2020 - 10:00 - 11:00",
      title: "Meeting with friends",
      description: "Meet-Up for Travel Destination Discussion",
      color: "bg-purple-600",
      time: "10:00 - 11:00",
    },
    {
      id: 2,
      date: "Jan 10, 2020 - 05:40 - 13:00",
      title: "Visiting online course",
      description: "Check updates for design course",
      color: "bg-sky-400",
      time: "05:40 - 13:00",
    },
    {
      id: 3,
      date: "Jan 14, 2020 - 10:00 - 11:00",
      title: "Development meet",
      description: "Discussion with developers for upcoming project",
      color: "bg-emerald-600",
      time: "10:00 - 11:00",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {" "}
      <Calendar />
      <section className="bg-white flex flex-col border-2 border-black-600/60 p-8 rounded-lg w-full border border-[#E0E1E6] shadow-sm">
        <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
          Upcoming Events
        </h2>
        <p className="text-lg font-normal text-gray-600 mb-8">
          Don't miss schedule
        </p>
        <div className="flex gap-5 flex-col">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CalendarUI;
