import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchPage;
