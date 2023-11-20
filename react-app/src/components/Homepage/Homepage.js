import React from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./Homepage.css";

function Homepage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  console.log("🚀🚀🚀🚀🚀🚀 ~ spots:", spots);
  const allSpots = Object.values(spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    return null;
  }
  //poo
  return (
    <>
      <h1>HOMEPAGE</h1>
      <div className="spots-grid">
        {allSpots.map((spot) => (
          <div key={spot.id}>
            <h2>{spot.business_name}</h2>
            <p>user name here</p>
            <p>user review here</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
