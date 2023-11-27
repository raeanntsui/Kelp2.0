import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./ShowAllSpots.css";

const ResultNotFoundMessage = ({ searchInput, address }) => (
  <div className="result-not-found">
    No results for {searchInput} {address && `(${address})`}
  </div>
);

function ShowAllSpots() {
  const dispatch = useDispatch();
  const location = useLocation();
  const spots = useSelector((state) => state.spots.allSpots);
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const allSpots = Object.values(spots);

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
  };

  useEffect(() => {
    if (searchButtonClicked) {
      dispatch(getAllSpotsThunk());
      setSearchButtonClicked(false);
    }
  }, [dispatch, searchButtonClicked]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    setSearchInput(searchQuery);
  }, [location.search]);

  const filteredSpots = allSpots.filter((spot) => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const isNameMatch = spot.business_name.toLowerCase().includes(lowerCaseSearchInput);
    const isCategoryMatch = spot.categories.toLowerCase().includes(lowerCaseSearchInput);
    const isPriceRangeMatch = typeof spot.price_range === 'string' && spot.price_range.toLowerCase().includes(lowerCaseSearchInput);

    return isNameMatch || isCategoryMatch || isPriceRangeMatch;
  });

  let count = 1;
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search by name, category, or price range"
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      <div className="spots-front-page">
        {filteredSpots.length === 0 ? (
          <div className="results-container">
            <ResultNotFoundMessage
              searchInput={searchInput}
              address={filteredSpots[0]?.address}
            />
            <div className="suggestions-container">
              <div className="suggestions-header">
                Suggestions for improving your results:
              </div>
              <div className="suggestions-list">
                <ul>Try a larger search area</ul>
                <ul>Try a different location</ul>
                <ul>Check the spelling or try alternate spellings</ul>
                <ul>Try a more general search, e.g. "pizza instead of "pepperoni"</ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="spots-grid">
            {filteredSpots.map((spot) => (
              <NavLink
                key={spot.id}
                to={`/spots/${spot.id}`}
                id="spots-grid-navlink"
              >
                <div className="spots-grid-each">
                  <div className="each-spot">
                    <div className="each-spots-image">
                      <img
                        src="https://img.buzzfeed.com/buzzfeed-static/static/2019-11/21/20/campaign_images/fbf76a44e63d/could-you-pass-an-interview-and-get-hired-at-the--2-2131-1574368600-0_dblbig.jpg?resize=1200:*"
                        alt="Spot Image"
                      />
                    </div>
                    <div className="each-spots-info">
                      <h2 id="spot-title">
                        {count++}. {spot.business_name}
                      </h2>
                      <div className="filled-star">
                        <p>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                        </p>
                      </div>
                      <span className="categories">{spot.categories}</span>
                      <div id="open-time">
                        <p className="opening-hours">
                          <span className="open">Open</span> until{" "}
                          {spot.close_hours - 12}:00 PM
                        </p>
                      </div>
                      <p className="spot-description ellipsis-text">
                        {spot.description}
                      </p>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
        <div className="google-maps-grid">
          <img
            src="https://www.google.com/maps/d/thumbnail?mid=149XtkqRiBZ68Y28N8Px4kMh9ld4&hl=en"
            alt="Google Maps Thumbnail"
          />
        </div>
      </div>
    </>
  );
}

export default ShowAllSpots;
