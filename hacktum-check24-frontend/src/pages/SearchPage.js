import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    const postCodePattern = /^[0-9]{5}$/;

    if (!trimmedQuery) {
      alert("Please enter a post code.");
    } else if (!postCodePattern.test(trimmedQuery)) {
      alert("Please enter a valid post code.");
    } else {
      navigate(`/results?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-header">
        <h1>Türen & Fenster lackieren</h1>
        <p>0 %</p>
      </div>
      <div className="search-question">
        <p>In welcher PLZ suchen Sie einen Maler?</p>
      </div>
      <div className="search-input-container">
        <input
          className="search-input-field"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Your Post Code"
        />
        {/* <button className="clear-search" onClick={() => setSearchQuery("")}>
          X
        </button> */}
      </div>
      <div className="search-button-container">
        <button className="search-submit-button" onClick={handleSearch}>
          weiter
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
