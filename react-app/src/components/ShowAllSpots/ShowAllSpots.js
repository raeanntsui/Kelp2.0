import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./ShowAllSpots.css";

function ShowAllSpots() {
  const dispatch = useDispatch();
  const location = useLocation();
  const spots = useSelector((state) => state.spots.allSpots);
  const [searchInput, setSearchInput] = useState("");

  const allSpots = Object.values(spots);

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    setSearchInput(searchQuery);
  }, [location.search]);

  const filteredSpots = allSpots.filter((spot) => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const isNameMatch = spot.business_name
      ?.toLowerCase()
      ?.includes(lowerCaseSearchInput);
    const isCategoryMatch = spot.categories
      ?.toLowerCase()
      ?.includes(lowerCaseSearchInput);
    const isPriceRangeMatch =
      typeof spot.price_range === "string" &&
      spot.price_range.toLowerCase()?.includes(lowerCaseSearchInput);

    return isNameMatch || isCategoryMatch || isPriceRangeMatch;
  });

  //poo
  let count = 1;
  return (
    <>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search by name, category, or price range"
      />
      <div className="spots-front-page">
        {filteredSpots.length === 0 ? (
          <div className="result-not-found">No results found</div>
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
