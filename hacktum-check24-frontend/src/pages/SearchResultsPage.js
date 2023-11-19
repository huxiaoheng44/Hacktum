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

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchResults(query, currentPage);
    }
  }, [searchParams, currentPage]);

  const fetchResults = (query, page) => {
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
        setPagesData((prevPagesData) => [...prevPagesData, ...data.craftsmen]);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

      <div className="search-result-container">
        <CraftcardBoard craftsmen={pagesData} />
      </div>
      <div className="load-more" onClick={handleLoadMore}>
        Load More
      </div>
    </div>
  );
}

export default SearchResultsPage;
