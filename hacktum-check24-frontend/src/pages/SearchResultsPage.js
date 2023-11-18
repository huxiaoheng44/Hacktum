import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import baseURL from "../config";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchResults(query);
    }
  }, [searchParams]);

  const fetchResults = (query) => {
    setLoading(true);
    fetch(`${baseURL}/api/search?query=${encodeURIComponent(query)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>{result.title}</div>
      ))}
    </div>
  );
}

export default SearchResultsPage;
