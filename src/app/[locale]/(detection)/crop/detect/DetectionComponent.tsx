import { Send, Upload } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import Aler

const DetectionComponent = ({ fruit }) => {
  // const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detectionResult, setDetectionResult] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (event) => {
    try {
      setDetectionResult(null);
      setImage(null);
      setLoading(true);
      setError("");
      const file = event.target.files?.[0];
      if (!file) return;

      const base64Image = await convertToBase64(file);
      const response = await fetch("/api/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          fruit_type: fruit,
        }),
      });

      if (!response.ok) {
        throw new Error("Detection failed");
      }

      const result = await response.json();
      setDetectionResult(result);
      setImage(result.detection_result_img);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRipenessColor = (ripeness) => {
    switch (ripeness?.toLowerCase()) {
      case "ripe":
        return "bg-green-500";
      case "un_ripe":
        return "bg-yellow-500";
      case "over_ripe":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="w-11/12 flex flex-col items-center justify-center gap-8">
        {!image && (
          <>
            <img src="/undraw_the_search_s0xf.svg" alt="" className="h-80" />
            <h2 className="font-bold text-2xl sm:text-3xl text-center text-black">
              Start detecting by clicking the button
            </h2>
          </>
        )}

        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        )}

        {detectionResult && (
          <div className="w-full space-y-4">
            <div
              className={`p-4 rounded-lg text-white text-center text-lg font-semibold ${getRipenessColor(
                detectionResult.ripeness
              )}`}
            >
              Ripeness: {detectionResult.ripeness}
              <div className="text-sm mt-1">
                Confidence: {(detectionResult.confidence * 100).toFixed(1)}%
              </div>
            </div>
            <img
              src={image}
              alt="Detection Result"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex w-full gap-4">
          <label className="w-full text-xl bg-teal-500 text-white rounded-xl py-2 px-4 flex flex-row-reverse justify-center font-bold items-center gap-2 cursor-pointer">
            <Upload size={24} />
            <span className="font-bold">Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={loading}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DetectionComponent;
