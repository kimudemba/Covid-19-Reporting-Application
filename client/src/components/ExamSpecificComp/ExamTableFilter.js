import React from "react";

export const ExamTableFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <span>
      <input
        value={filterValue || ""}
        placeholder="start typing to filter here"
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
