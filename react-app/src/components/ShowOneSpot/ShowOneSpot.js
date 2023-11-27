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
  // console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser.first_name:", sessionUser.first_name);

  const spot = useSelector((state) => state.spots.oneSpot);
  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("🚀 ~ file: ShowOneSpot.js:20 ~ ShowOneSpot ~ review:", reviews);

  // session owner id
  const userId = sessionUser.id;

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

  // const spotBackground = {
  //   backgroundImage:
  //     'url("https://m.media-amazon.com/images/M/MV5BMTRkNTEzNDQtOGZmMC00MDA2LWJiYmYtZDI0YmFjZWUyMjZlXkEyXkFqcGdeQXVyODA1ODcxNTY@._V1_.jpg")',
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   height: "300px",
  //   width: "100%",
  // };

  return (
    <>
      <div className="spot-details-page">
        {/* <p>Business Owner: {spot.user_id}</p> */}
        <div className="spot-details-bottom">
          {/* <div className="spot-background">
            <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2022/07/super-weenie-hut-jrs-from-spongebob-squarepants.jpg" />
          </div> */}
          <div className="business-name">
            <p>{spot.business_name}</p>
          </div>
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
              <span className="open">Open</span> until {spot.close_hours - 12}
              :00 PM
            </p>
          </div>
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

        <div className="left-right">
          <div className="left">
            <div className="write-review">
              {sessionUser && !businessOwner ? (
                <ReviewModal spot={spot} />
              ) : null}
            </div>
            <div className="show-one-spot-bottom-content">
              {/* <p>{spot.address}</p> */}
              <p>About the Business: {spot.description}</p>
              <div className="spot-details-top">
                <h2>Reviews</h2>
                <div>
                  {Object.values(reviews).map((review) => (
                    <>
                      <p>{review.description}</p>
                    </>
                  ))}
                </div>

                <UpdateReview spot={spot} review={currentUserReview} />
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
            </div>
          </div>

          <div className="right">
            <div className="about-restaurant">
              <h1>Get Directions</h1>
              {spot.address}
              <i class="fa-solid fa-map"></i>
              {spot.description}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ShowOneSpot;
