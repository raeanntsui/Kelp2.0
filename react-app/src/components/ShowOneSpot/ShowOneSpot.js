import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import ReviewModal from "../Reviews";
import "./ShowOneSpot.css";

function ShowOneSpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser:", sessionUser);
  console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser.first_name:", sessionUser.first_name);

  const spot = useSelector((state) => state.spots.oneSpot);
  console.log("🚀🚀🚀🚀🚀🚀 ~ spot:", spot);

  const { spotId } = useParams();
  console.log("🚀🚀🚀🚀🚀🚀 ~ spotId:", spotId);
  // const singleSpot = Object.values(spot);

  // const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ reviews:", reviews);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch]);

  // if (!spot || !spot.length) {
  //   return null;
  // }

  return (
    <>
      <div>
        <h1>GET SINGLE SPOT</h1>
        {/* <p>Business Owner: {spot.user_id}</p> */}
        <p>{spot.business_name}</p>
        <p>Store rating here</p>
        <p>{spot.categories}</p>
        <p>{spot.address}</p>
        <p>About the Business: {spot.description}</p>
      </div>
      <div>
        <h2>Reviews</h2>
        {/* {sessionUser ? { sessionUser } : <p>No session user</p>} */}
        <ReviewModal spot={spot} />
      </div>
    </>
  );
}

export default ShowOneSpot;
