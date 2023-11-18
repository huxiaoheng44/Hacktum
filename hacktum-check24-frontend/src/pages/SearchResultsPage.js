import React from "react";
import { useLocation } from "react-router-dom";

function SearchResultsPage() {
  let location = useLocation();

  function getSearchQuery() {
    const params = new URLSearchParams(location.search);
    return params.get("query");
  }

  const searchQuery = getSearchQuery();

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
    </div>
  );
}

export default SearchResultsPage;
