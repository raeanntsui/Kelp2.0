import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./Homepage.css";

function Homepage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const allSpots = Object.values(spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    return null;
  }

  const sortedSpots = allSpots.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const latestSpots = sortedSpots.slice(0, 6);

  return (
    <>
      <div className="recent-activity">
        <h1>Recent Activity</h1>
      </div>

      <div className="latest-spots">
        {latestSpots.map((spot) => (
          <div className="each-spot-in-latest-spots" key={spot.id}>
            <div className="user-container">
              {spot.review?.length === 0 ? null : (
                <div className="user-profile-picture">
                  <i class="fa-solid fa-user"></i>
                </div>
              )}
              <div className="user-info">
                {spot.review.length === 0 ? (
                  <div>
                    <p>Be the first to leave a review!</p>
                  </div>
                ) : (
                  spot.review.slice(0, 1).map((review) => (
                    <div key={review.id}>
                      <p>{review.user.first_name}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="recent-activity-business-name">
              <NavLink to={`/spots/${spot.id}`}>{spot.business_name}</NavLink>
            </div>
            <div className="each-spots-image-2">
              {spot.img_urls.length > 0 ? (
                spot.img_urls &&
                spot.img_urls[0] && (
                  <img src={spot.img_urls[0]} alt={`Spot Image 0`} />
                )
              ) : (
                <img
                  src="https://t3.ftcdn.net/jpg/06/42/18/22/360_F_642182262_4kqb9AgMr0qhqBHcwWEgTfvTCOFklokO.jpg"
                  alt="default spot image"
                />
              )}
            </div>
            <div className="user-description">
              {spot.review.slice(0, 1).map((review) => (
                <div key={review.id}>
                  <p>{review.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
