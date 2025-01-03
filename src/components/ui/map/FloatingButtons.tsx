import React from 'react';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-teal-500 p-4 rounded-full shadow-lg text-white"
        onClick={() => alert('Select Date Range')}
      >
        Date Range
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-blue-500 p-4 rounded-full shadow-lg text-white"
        onClick={() => alert('Select Basemap')}
      >
        Basemap
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-purple-500 p-4 rounded-full shadow-lg text-white"
        onClick={() => alert('Select Map Layer')}
      >
        Map Layer
      </motion.button>
    </div>
  );
};

export default FloatingButtons;
