"use client";
import { useState } from "react";
import { Palmtree, CheckCircle, AlertCircle, Users } from "lucide-react";
import DetectionComponent from "./DetectionComponent";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { RiAddLargeFill } from "@remixicon/react";
const Page = () => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ crop: "", detection: "" });

  const handleCropSelection = (crop: string) => {
    setSelection({ ...selection, crop });
    setStep(2);
  };

  const handleDetectionSelection = (detection: string) => {
    setSelection({ ...selection, detection });
    setStep(3);
  };

  return (
    <div className="px-6 sm:px-12 flex flex-col gap-12 pb-12">
      <div className="flex justify-between">
        <BreadCrumbs
          title="Detection"
          icon={<Users className="text-icon w-8 h-8" />}
        />
      </div>
      <div className="flex justify-center items-center ">
        {step === 1 && (
          <div className="flex flex-col sm:flex-row gap-8">
            <div
              className="bg-[#14B8A6] w-96 h-96 flex justify-center items-center flex-col p-24 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleCropSelection("palm")}
            >
              <img src="https://cdn-icons-png.flaticon.com/512/661/661764.png" alt=""  className="w-full h-full mx-auto text-gray-300"/>
              <p className="text-center mt-2 text-white font-bold text-white font-bold text-xl">
                Palm
              </p>
            </div>
            <div
              className="bg-[#14B8A6] w-96 h-96 flex justify-center items-center flex-col p-24 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleCropSelection("pineapple")}
            >
              <Palmtree className="w-full h-full mx-auto text-gray-300 text-gray-300" />
              <img src="https://cdn-icons-png.flaticon.com/512/4751/4751091.png" alt=""  className="w-full h-full mx-auto text-gray-300"/>

              <p className="text-center mt-2 text-white font-bold text-xl">
                Pineapple
              </p>
            </div>
          </div>
        )}
        {/* {step === 2 && (
          <div className="flex space-x-4">
            <div
              className="bg-[#14B8A6] w-96 h-96 flex justify-center items-center flex-col p-24 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleDetectionSelection("ripeness")}
            >
              <CheckCircle className="w-full h-full mx-auto text-gray-300 text-gray-300" />
              <p className="text-center mt-2 text-white font-bold text-xl">
                Ripeness Detection
              </p>
            </div>
            <div
              className="bg-[#14B8A6] w-96 h-96 flex justify-center items-center flex-col p-24 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleDetectionSelection("diseases")}
            >
              <AlertCircle className="w-full h-full mx-auto text-gray-300 text-gray-300" />
              <p className="text-center mt-2 text-white font-bold text-xl">
                Diseases Detection
              </p>
            </div>
          </div>
        )} */}
        {step === 2 && <DetectionComponent fruit={selection.crop} type={selection.detection} />}
      </div>
    </div>
  );
};

export default Page;
