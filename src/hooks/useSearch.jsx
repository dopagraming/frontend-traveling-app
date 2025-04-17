import React, { useEffect, useState } from "react";

const useSearch = (value, delay = 400) => {
  const [search, setSearch] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setSearch(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return search;
};

export default useSearch;
