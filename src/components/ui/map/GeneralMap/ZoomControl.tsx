export const CustomZoomControl = ({ mapInstance }) => (
    <div className="absolute bottom-4 right-4 bg-white rounded shadow-lg z-50 flex flex-col">
      <button
        onClick={() => mapInstance?.zoomIn()}
        className="text-3xl p-2 bg-gray-200 hover:bg-gray-300 rounded-t"
      >
        +
      </button>
      <button
        onClick={() => mapInstance?.zoomOut()}
        className="text-3xl p-2 bg-gray-200 hover:bg-gray-300 rounded-b"
      >
        −
      </button>
    </div>
  );
  