import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import ReviewModal from "../Reviews";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import "./ShowOneSpot.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getReviewsThunk } from "../../store/reviews";

function ShowOneSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser:", sessionUser);

  const spot = useSelector((state) => state.spots.oneSpot);
  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("🚀 ~ file: ShowOneSpot.js:20 ~ ShowOneSpot ~ review:", reviews);

  // session owner id
  const userId = sessionUser.id;
  const reviewerName = reviews.user_id;
  console.log("🚀🚀🚀🚀🚀🚀 ~ reviewerName:", reviewerName);

  // finding business modal user id
  const businessOwnerId = spot.user_id;

  const businessOwner = userId === businessOwnerId;
  console.log(
    "🚀 ~ file: ShowOneSpot.js:27 ~ ShowOneSpot ~ businessOwner:",
    businessOwner
  );

  console.log("🚀🚀🚀🚀🚀🚀 ~ spotId:", spotId);
  // const singleSpot = Object.values(spot);

  // const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ reviews:", reviews);

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  // if (!spot || !spot.length) {
  //   return null;
  // }

  const handleSpotUpdate = () => {
    history.push(`/spots/${spotId}/update`);
  };

  const allUsers = spot.user_id;
  console.log("🚀🚀🚀🚀🚀🚀 ~ allUsers:", allUsers);

  return (
    <>
      <div>
        <h1>GET SINGLE SPOT</h1>
        {/* <p>Business Owner: {spot.user_id}</p> */}
        <p>{spot.business_name}</p>
        {/* <p>Spot owner id: {spot.user_id}</p> */}
        <p>AVERAGE RATING HERE</p>
        <p>Business category: {spot.categories}</p>
        <p>{spot.address}</p>
        <p>About the Business: {spot.description}</p>
      </div>
      <div>
        <h2>Reviews</h2>
        <p>Get all reviews component here</p>

        {sessionUser && !businessOwner ? (
          <ReviewModal spot={spot} />
        ) : (
          <p>Random message: Cannot post review -- you are the owner!</p>
        )}
        <div>
          {Object.values(reviews).map((review) => (
            <>
              <p>User ID: {review.user_id}</p>
              {/* <p>{review.User.first_name}</p> */}
              <p>Star Rating: {review.rating}</p>
              <p>Review Description: {review.description}</p>
            </>
          ))}
        </div>
        <div>
          <DeleteSpot />
        </div>
        <div>
          <div>
            {businessOwner && (
              <>
                <h1>Update Spot</h1>
                <button onClick={handleSpotUpdate}>Update Spot</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowOneSpot;
