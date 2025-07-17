import { useState, useEffect } from "react";

const useWindowSize = () => {
  // Start with zero values to keep server and client consistent
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Only run on client side
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial size once mounted
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowSize;
