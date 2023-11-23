import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import ReviewModal from "../Reviews";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import "./ShowOneSpot.css";
import { getReviewsThunk } from "../../store/reviews";

function ShowOneSpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser:", sessionUser);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser.first_name:", sessionUser.first_name);

  const spot = useSelector((state) => state.spots.oneSpot);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ spot:", spot);

  const reviews = useSelector((state) => state.reviews.Reviews);
  console.log("🚀 >>>>>>>>>> ~ reviews:", reviews);

  const { spotId } = useParams();
  // console.log("🚀🚀🚀🚀🚀🚀 ~ spotId:", spotId);
  // const singleSpot = Object.values(spot);

  // const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ reviews:", reviews);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);

  // if (!spot || !spot.length) {
  //   return null;
  // }

  return (
    <>
      <div>
        <h1>GET SINGLE SPOT</h1>
        {/* <p>Business Owner: {spot.user_id}</p> */}
        <p>{spot.business_name}</p>
        <p>Spot owner id: {spot.user_id}</p>
        <p>AVERAGE RATING HERE</p>
        <p>Business category: {spot.categories}</p>
        <p>{spot.address}</p>
        <p>About the Business: {spot.description}</p>
      </div>
      <div>
        <h2>Reviews</h2>
        <p>Get all reviews component here</p>
        <div>
          {Object.values(reviews).map((review) => (
            <>
              <div>{review.User?.firstName}</div>
              <p>{review.review}</p>
            </>
          ))}
        </div>
        {sessionUser ? <ReviewModal spot={spot} /> : <p>No session user</p>}
        <div>
          <DeleteSpot />
        </div>
      </div>
    </>
  );
}

export default ShowOneSpot;
