"use client";

import { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/visitor");
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch visitor count:", err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="text-sm text-center pb-1 text-gray-500 mt-4">
      {count !== null
        ? `👀 ${count} visitors so far.`
        : "Loading visitor count..."}
    </div>
  );
};

export default VisitorCounter;
