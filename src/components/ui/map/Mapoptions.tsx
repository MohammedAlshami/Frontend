import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Icon } from "@iconify/react";

import Image from "next/image";

interface MapOptionsProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export function MapOptions({
  selectedOption,
  setSelectedOption,
}: MapOptionsProps) {
  const links = [
    {
      title: "Basemap",
      icon: (
        // <Image
        //   src="https://assets.aceternity.com/logo-dark.png"
        //   width={20}
        //   height={20}
        //   alt="Aceternity Logo"
        // />
        <Icon
          icon="material-symbols:map"
          width={24}
          height={24}
          className="text-neutral-900
        "
        />
      ),
      href: "#",
    },

    {
      title: "Layers",
      icon: (
        <Icon
          icon="fa-solid:layer-group"
          width={20}
          height={20}
          className="text-neutral-900
      "
        />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
    </div>
  );
}
