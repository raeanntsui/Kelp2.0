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

  return (
    <>
      <h1>Hello this is the get all spots component</h1>
    </>
  );
}

export default ShowAllSpots;
