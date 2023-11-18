import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    const postCodePattern = /^[0-9]{5}$/;

    if (!trimmedQuery) {
      setModalContent("Please enter a post code.");
      setIsModalVisible(true);
    } else if (!postCodePattern.test(trimmedQuery)) {
      setModalContent("Please enter a valid post code.");
      setIsModalVisible(true);
    } else {
      navigate(`/results?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="search-page-container">
      <div className="search-header">
        <div className="app-title">CHECK24 Craftsmen Comparison</div>
      </div>
      <div className="search-question">
        <p>In which zip code are you looking for a painter?</p>
      </div>
      <div className="search-input-container">
        <input
          className="search-input-field"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Your Post Code"
        />
      </div>
      <div className="search-button-container">
        <button className="search-submit-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {isModalVisible && (
        <div className="alert-modal">
          <div className="alert-text">{modalContent}</div>
          <button className="craftCard-button" onClick={handleCloseModal}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
