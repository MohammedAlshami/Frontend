"use client";

import { Users, Calendar, MapPin, Send } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm text-white">
      {icon}
      {content}
    </div>
  );
};

const Fields = () => {
  const [farmsData, setFarmsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFarmsData = async () => {
      try {
        const response = await fetch("/data/farmData.json");
        const data = await response.json();
        setFarmsData(data);
      } catch (error) {
        console.error("Error fetching farm data:", error);
      }
    };

    fetchFarmsData();
  }, []);

  // Filtered data based on search term
  const filteredFarms = farmsData.filter((field) =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 sm:px-12 flex flex-col gap-8 pb-12">
      {/* Welcome Section */}
      <div className="pt-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hi there! <span className="wave">👋</span>
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Welcome back! Find and manage your fields easily.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex w-full px-4 py-3 border border-gray-300 rounded-xl">
        <input
          type="text"
          placeholder="Search for fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
        <div className="bg-teal-600 p-2 pr-3 rounded-lg flex justify-center items-center">
          <Send className="w-full h-full text-white rotate-45" />
        </div>
      </div>

      {/* Fields Section */}
      <div className="grid grid-cols-1 gap-8 pt-0">
        {filteredFarms.map((field) => (
          <Link
            href={`/en/mobile/map/view?map_id=${field.href}`}
            key={field.id}
            className="shadow-md bg-accent rounded-xl overflow-hidden shadow-sm border border-gray-200 transform transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <div className="relative">
              {/* Background Image */}
              <Image
                width={400}
                height={400}
                src={field.image}
                alt={field.name}
                className="w-full h-56 object-cover"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-black opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />

              {/* Title Bar */}
              <div className="absolute top-0 left-0 right-0 h-full p-4 flex flex-col justify-between z-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white">
                    <h2 className="text-lg font-bold">{field.name}</h2>
                  </div>
                  <div className="p-2 rounded-full bg-teal-300 bg-opacity-50 text-white">
                    <Icon
                      icon="typcn:arrow-back"
                      width="24"
                      height="24"
                      className="rotate-180"
                    />
                  </div>
                </div>
                <DetailItem
                  icon={
                    <span className="text-sm text-white bg-teal-300 p-2 rounded-full">
                      <MapPin className="w-4 h-4" />
                    </span>
                  }
                  content={field.location}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredFarms.length === 0 && (
        <p className="text-gray-500 text-center">
          No fields match your search. Try adjusting your keywords.
        </p>
      )}
    </div>
  );
};

export default Fields;
