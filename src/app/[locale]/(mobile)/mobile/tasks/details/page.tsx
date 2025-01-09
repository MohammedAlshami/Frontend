"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  CheckSquare,
  ArrowRight,
} from "lucide-react";
import { IconDetails } from "@tabler/icons-react";
import { RiTodoLine } from "@remixicon/react";
import 'mapbox-gl/dist/mapbox-gl.css';


// Set Mapbox access token
mapboxgl.accessToken =
  "process.env.NEXT_PUBLIC_MAPBOX_TOKEN || """;

const TaskDetails = () => {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Inspect Zone A for signs of pest damage, including wilting leaves or visible insects.",
      completed: false,
    },
    {
      id: 2,
      text: "Measure and record soil moisture levels to ensure proper irrigation in Zone B.",
      completed: false,
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [103.771028, 1.632294],
      zoom: 15,
    });

    // Add a marker for the center coordinates
    new mapboxgl.Marker().setLngLat([103.771028, 1.632294]).addTo(map);

    return () => map.remove();
  }, []);

  const toggleNoteCompletion = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24 ">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-2">
          <div className="flex gap-20 items-center mb-6">
            <button
              className=" border-2 border-gray-600/20 p-2 rounded-full "
              onClick={() => router.back()}
            >
              <ChevronLeft />
            </button>
            <h1 className="text-lg font-semibold">Task Details</h1>
          </div>
        </div>

        {/* Task Title Section */}
        <div className="px-6 mb-6 ">
          <h2 className="text-2xl font-bold mb-2">Inspection Task</h2>
          <p className="text-gray-500 mb-4">
            Regular inspection to ensure the health and quality of the pineapple
            crops.
          </p>
          <div className="flex gap-2">
            <div className="bg-blue-500 px-4 py-1 rounded-full">
              <span className="text-white text-sm">Inspection</span>
            </div>
            <div className="bg-green-500 px-4 py-1 rounded-full">
              <span className="text-white text-sm">Pineapple</span>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="px-6 space-y-4 mb-6">
          <div className="flex items-center">
            <Calendar size={20} color="#666" />
            <p className="ml-3 text-gray-600">Friday, 23 October</p>
          </div>
          <div className="flex items-center">
            <Clock size={20} color="#666" />
            <p className="ml-3 text-gray-600">11:00-13:00</p>
          </div>
          <div className="flex items-center">
            <MapPin size={20} color="#666" />
            <p className="ml-3 text-gray-600">
              South Street Journal SR, Nike Jc, 23/34
            </p>
          </div>
        </div>

        {/* Map View */}
        <div className="px-6 mb-6">
          <div className="h-40 rounded-xl overflow-hidden">
            <div
              ref={mapContainerRef}
              className="h-full w-full"
              style={{ position: "relative" }}
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="px-6">
          <h3 className="text-lg font-semibold mb-4">Inspection Notes</h3>
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between py-3 border-t border-gray-100"
            >
              <button
                className="flex items-center"
                onClick={() => toggleNoteCompletion(note.id)}
              >
                <CheckSquare
                  size={20}
                  color={note.completed ? "#000" : "#666"}
                  fill={note.completed ? "#000" : "none"}
                />
                <span
                  className={`flex-1 ml-3 w-64 ${
                    note.completed
                      ? "line-through text-gray-400"
                      : "text-gray-600"
                  } overflow-hidden text-ellipsis whitespace-nowrap`}
                >
                  {note.text}
                </span>
              </button>
              <button
                className="ml-2 border-2 border-gray-600/20 p-2 rounded-full "
                onClick={() => setSelectedNote(note.text)}
              >
                <ArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-12">
            <div className="flex gap-2">
              <RiTodoLine />
              <h3 className="text-lg font-bold mb-4">Note Details</h3>
            </div>
            <p className="text-gray-600">{selectedNote}</p>
            <button
              className="mt-4 px-4 w-full py-2 bg-teal-600 text-white rounded-xl"
              onClick={() => setSelectedNote(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
