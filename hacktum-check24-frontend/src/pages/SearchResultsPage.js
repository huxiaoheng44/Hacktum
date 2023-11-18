import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CraftcardBoard from "../components/CraftCardBoard";
import baseURL from "../config";
import "./SearchResultsPage.css";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [craftsmen, setCraftsmen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchResults(query);
    }
  }, [searchParams]);

  const fetchResults = (query) => {
    setLoading(true);
    fetch(
      `${baseURL}/craftsmen?postalcode=${encodeURIComponent(
        query
      )}&page=${currentPage}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCraftsmen(data.craftsmen.craftsmen);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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
        {/* <div className="navBar-bottom">
          <button id="commentFilter">Comments</button>
          <button id="distanceFilter">Distance</button>
          <button id="ratingFilter">Rating</button>
        </div> */}
      </div>
      <div className="search-result-container">
        <CraftcardBoard craftsmen={craftsmen} />
      </div>
      <div className="load-more">Load More</div>
    </div>
  );
}

export default SearchResultsPage;
