import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import Fuse from 'fuse.js';
import "./ShowAllSpots.css";

function ShowAllSpots() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpots, setFilteredSpots] = useState([]);

  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ spots:", spots);
  const allSpots = Object.values(spots);

  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ reviews:", reviews);

  const fuseOptions = {
    keys: ['business_name', 'categories', 'price_range'],
    includeScore: true,
    threshold: 0.4,
  };

  const fuse = new Fuse(allSpots, fuseOptions);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredSpots(allSpots);
    } else {
      const results = fuse.search(query);
      setFilteredSpots(results.map((result) => result.item));
    }
  };

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    return null;
  }
  //poo
  return (
    <>
      <h1>GET ALL SPOTS</h1>
      <input
        type="text"
        placeholder="Search businesses..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="spots-grid">
        {filteredSpots.map((spot) => (
          <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            {/* <img src={spot.spot_image} /> */}
            <h2>{spot.business_name}</h2>
            <p>Spot rating here</p>
            <p>Category: {spot.categories}</p>
            <p>
              Hours: {spot.open_hours}AM to {spot.close_hours - 12}PM
            </p>
            <p>{spot.description}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default ShowAllSpots;
