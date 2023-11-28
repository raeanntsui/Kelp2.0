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
    if (!searchInput) {
      dispatch(getAllSpotsThunk());
    }
  }, [dispatch, searchInput]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    setSearchInput(searchQuery);
  }, [location.search]);

  const filteredSpots = allSpots.filter((spot) => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const isNameMatch = spot.business_name
      .toLowerCase()
      .includes(lowerCaseSearchInput);
    const isCategoryMatch = spot.categories
      .toLowerCase()
      .includes(lowerCaseSearchInput);
    const isPriceRangeMatch =
      typeof spot.price_range === "string" &&
      spot.price_range.toLowerCase().includes(lowerCaseSearchInput);

    return isNameMatch || isCategoryMatch || isPriceRangeMatch;
  });

  let count = 1;
  return (
    <>
      {/* <div className="search-bar">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.1/css/all.css"
        />
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search by name, category, or price range"
        />

        <button onClick={handleSearchButtonClick}>
          <i className="fas fa-search" style={{ color: 'white' }}></i>
        </button>

      </div> */}
      <div className="spots-front-page">
        {searchInput && filteredSpots.length === 0 ? (
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
                <ul>
                  Try a more general search, e.g. "pizza instead of "pepperoni"
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="spots-grid">
            {filteredSpots.map((spot) => (
              <NavLink
                key={spot.id}
                to={`/spots/${spot.id}`}
                id="spots-grid-navlink">
                <div className="spots-grid-each">
                  <div className="each-spot">
                    <div className="each-spots-image">
                      {spot.img_urls.length > 0 ? (
                        spot.img_urls &&
                        spot.img_urls[0] && (
                          <img src={spot.img_urls[0]} alt={`Spot Image 0`} />
                        )
                      ) : (
                        <img
                          src="https://m.media-amazon.com/images/M/MV5BZjgzNGUyNDQtMWMxMS00Nzc0LWE1NWQtODRkYzZiMDNlODQ2XkEyXkFqcGdeQXVyMTM0Mjc1MDYw._V1_.jpg"
                          alt="default spot image"
                        />
                      )}
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
        {/* <div className="google-maps-grid">
          <img
            src="https://www.google.com/maps/d/thumbnail?mid=149XtkqRiBZ68Y28N8Px4kMh9ld4&hl=en"
            alt="Google Maps Thumbnail"
          />
        </div> */}
      </div>
    </>
  );
}

export default ShowAllSpots;
