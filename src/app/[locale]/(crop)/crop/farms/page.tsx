"use client";
import { Users, Calendar, MapPin } from "lucide-react";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { RiAddLargeFill } from "@remixicon/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm text-white">
      {icon}
      {content}
    </div>
  );
};

const Fields = () => {
  // Fields data array
  const fields = [
    {
      id: 1,
      name: "Kulim Pineapple Farm",
      location: "Jalan Sungai Tiram, Johor Darul Ta'zim",
      image: "/farms/pineapple_thumbnail.png",
      href: "pineapple",
    },
    {
      id: 2,
      name: "Palm Oil Farm",
      location: "Jalan Sungai Tiram, Johor Darul Ta'zim",
      image: "/farms/palm_thumbnail.png",
      href: "palm",
    },
  ];

  return (
    <div>
      <div className="px-6 sm:px-12 flex flex-col gap-12 pb-12">
        <div className="flex justify-between">
          <BreadCrumbs
            title="Fields"
            icon={<Users className="text-icon w-8 h-8" />}
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <RiAddLargeFill className="w-4 h-4" />
            Add Field
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {fields.map((field) => (
            <Link
              href={`/en/crop/map?map_id=${field.href}`}
              key={field.id}
              className="shadow-sm bg-accent rounded-xl overflow-hidden shadow-sm border border-gray-200 transform transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                {/* Background Image */}
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-full h-56 object-cover"
                />

                {/* Black Overlay with 20% opacity */}
                <div className="absolute inset-0 bg-black opacity-20" />

                {/* Gradient Overlay from top to bottom with 40% opacity */}
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
                      <span className="text-sm tex-text-white bg-teal-300 p-2 rounded-full">
                        <MapPin className="w-4 h-4 " />
                      </span>
                    }
                    content={field.location}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fields;
