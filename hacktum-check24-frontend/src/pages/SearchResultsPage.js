import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CraftcardBoard from "../components/CraftCardBoard";
import baseURL from "../config";
import "./SearchResultsPage.css";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagesData, setPagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

  const fetchResults = (page) => {
    const query = searchParams.get("query");
    setLoading(true);
    fetch(
      `${baseURL}/craftsmen?postalcode=${encodeURIComponent(
        query
      )}&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message && data.message === "Invalid postal code") {
          setMessage("Invalid postal code");
        } else {
          setPagesData((prevPagesData) => [...prevPagesData, data.craftsmen]);
          setMessage("Load More");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  if (loading) {
    return <div className="load-more">Loading...</div>;
  }

  if (error) {
    return <div className="load-more">Error: {error}</div>;
  }

  return (
    <div className="resultpage-container">
      <div className="navBar-container">
        <div className="navBar-top">
          <button
            className="navBar-button"
            onClick={() => window.history.back()}
          >
            {" < back"}
          </button>
          <button className="navBar-button">⭐</button>
        </div>
      </div>

      {pagesData.map((craftsmen, index) => (
        <div key={index} className="search-result-container">
          <CraftcardBoard craftsmen={craftsmen} />
        </div>
      ))}

      <div className="load-more" onClick={handleLoadMore}>
        {message}
      </div>
    </div>
  );
}

export default SearchResultsPage;
