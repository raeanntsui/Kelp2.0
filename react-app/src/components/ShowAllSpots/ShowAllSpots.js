import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./ShowAllSpots.css";
import DeleteSpot from "../DeleteSpot/DeleteSpot";

function ShowAllSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ spots:", spots);
  const allSpots = Object.values(spots);

  const reviews = useSelector((state) => state.reviews.Reviews);
  console.log("🚀🚀🚀🚀🚀🚀 ~ reviews:", reviews);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    return null;
  }
  //poo
  let count = 1;
  return (
    <>
      {/* <h1>GET ALL SPOTS</h1> */}
      <div className="spots-front-page">
        <div className="spots-grid">
          {allSpots.map((spot) => (
            <NavLink
              key={spot.id}
              to={`/spots/${spot.id}`}
              id="spots-grid-navlink">
              <div className="spots-grid-each">
                <div className="each-spot">
                  <div className="each-spots-image">
                    {/* <img src={spot.spot_image} /> */}
                    <img src="https://img.buzzfeed.com/buzzfeed-static/static/2019-11/21/20/campaign_images/fbf76a44e63d/could-you-pass-an-interview-and-get-hired-at-the--2-2131-1574368600-0_dblbig.jpg?resize=1200:*" />
                  </div>
                  <div className="each-spots-info">
                    <h2 id="spot-title">
                      {count++}. {spot.business_name}
                    </h2>
                    <div className="filled-star">
                      {" "}
                      Insert ratings logic here:{" "}
                      <i class="fa-solid fa-star"></i>
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
        <div className="google-maps-grid">
          <img src="https://www.google.com/maps/d/thumbnail?mid=149XtkqRiBZ68Y28N8Px4kMh9ld4&hl=en" />
        </div>
      </div>
    </>
  );
}

export default ShowAllSpots;
