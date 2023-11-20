import React from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./ShowAllSpots.css";

function ShowAllSpots() {
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
      <h1>GET ALL SPOTS</h1>
      <div className="spots-grid">
        {allSpots.map((spot) => (
          <div key={spot.id}>
            <h2>{spot.business_name}</h2>
            <p>Spot rating here</p>
            <p>Category: {spot.categories}</p>
            <p>
              Hours: {spot.open_hours}AM to {spot.close_hours - 12}PM
            </p>
            <p>{spot.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowAllSpots;
