"use client";

import { useState, useEffect } from "react";

function FormattedDate({ date }: { date: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a placeholder if you prefer
  }

  return (
    <>
      <p className="text-sm text-gray-400">
        {new Date(date).toLocaleDateString("en-GB")}
      </p>
    </>
  );
}

export default FormattedDate;
