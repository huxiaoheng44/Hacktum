import React, { useState } from "react";
import "./SearchInput.css";

const SearchInput = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchTerm) {
      alert("Search term cannot be empty!");
      return;
    }

    console.log("Search Term:", searchTerm);
    setSearchTerm("");
  };

  return (
    <div className="inputBar-container">
      <input
        className="input search-input"
        type="text"
        onChange={handleSearchChange}
        value={searchTerm}
        placeholder={props.defaultText || "Enter search term..."}
      />

      <button className="search-button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
