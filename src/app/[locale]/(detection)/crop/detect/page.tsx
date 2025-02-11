"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import DetectionComponent from "./DetectionComponent";

// Define the detection models data structure
const detectionModels = {
  palm: {
    cropImage: "https://cdn-icons-png.flaticon.com/512/4751/4751091.png",
    ripeness: {
      status: "ready",
      label: "Ripeness Detection",
      description: "Detect palm fruit ripeness",
      icon: "https://cdn-icons-png.flaticon.com/512/7156/7156237.png",
    },
    sizeGrading: {
      status: "disabled",
      label: "Size Grading",
      description: "Grade palm fruit by size",
      icon: "https://cdn-icons-png.flaticon.com/512/3063/3063499.png",
    },
    seedPollination: {
      status: "disabled",
      label: "Seed Pollination Detection",
      description: "Detect seed pollination status",
      icon: "https://cdn-icons-png.flaticon.com/512/6377/6377123.png",
    },
  },
  pineapple: {
    cropImage: "https://cdn-icons-png.flaticon.com/512/661/661764.png",
    ripeness: {
      status: "ready",
      label: "Ripeness Detection",
      description: "Detect pineapple ripeness",
      icon: "https://cdn-icons-png.flaticon.com/512/7156/7156237.png",
    },
    sizeGrading: {
      status: "disabled",
      label: "Size Grading",
      description: "Grade pineapple by size",
      icon: "https://cdn-icons-png.flaticon.com/512/3063/3063499.png",
    },
    seedPollination: {
      status: "disabled",
      label: "Seed Pollination Detection",
      description: "Detect seed pollination status",
      icon: "https://cdn-icons-png.flaticon.com/512/6377/6377123.png",
    },
  },
};

const Page = () => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ crop: "", detection: "" });

  const handleCropSelection = (crop) => {
    setSelection({ ...selection, crop });
    setStep(2);
  };

  const handleDetectionSelection = (detection) => {
    setSelection({ ...selection, detection });
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setSelection({ ...selection, crop: "" });
      } else if (step === 3) {
        setSelection({ ...selection, detection: "" });
      }
    }
  };

  return (
    <div className="px-6 sm:px-12 flex flex-col gap-12 pb-12">
      <div className="flex justify-between items-center">
        <BreadCrumbs
          title="Detection"
          icon={<Users className="text-icon w-8 h-8" />}
        />
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
        )}
      </div>

      <div className="flex justify-center items-center">
        {step === 1 && (
          <div className="flex flex-col sm:flex-row gap-8">
            {Object.entries(detectionModels).map(([crop, data]) => (
              <div
                key={crop}
                className="bg-[#14B8A6] w-96 h-96 flex justify-center items-center flex-col p-24 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleCropSelection(crop)}
              >
                <img
                  src={data.cropImage}
                  alt={`${crop} icon`}
                  className="w-32 h-32 mb-4"
                />
                <p className="text-center mt-2 text-white font-bold text-xl">
                  {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </p>
              </div>
            ))}
          </div>
        )}

        {step === 2 && selection.crop && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-8">
            {Object.entries(detectionModels[selection.crop])
              .filter(([key]) => key !== "cropImage")
              .map(([key, model]) => (
                <div
                  key={key}
                  className={`
                     w-96 h-96 flex justify-center items-center flex-col p-8 rounded-lg
                    ${
                      model.status === "ready"
                        ? "bg-[#14B8A6] cursor-pointer hover:scale-105 transition-transform"
                        : "bg-gray-300 cursor-not-allowed"
                    }
                  `}
                  onClick={() =>
                    model.status === "ready" && handleDetectionSelection(key)
                  }
                >
                  <div className="w-20 h-20 mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <img
                      src={model.icon}
                      alt={`${model.label} icon`}
                      className="w-12 h-12"
                    />
                  </div>
                  <p className="text-center text-white font-bold text-lg mb-2">
                    {model.label}
                  </p>
                  <p className="text-center text-white text-sm">
                    {model.description}
                  </p>
                  {model.status === "disabled" && (
                    <span className="mt-2 text-white/80 text-sm">
                      Coming Soon
                    </span>
                  )}
                </div>
              ))}
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-4xl">
            <DetectionComponent
              fruit={selection.crop}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
