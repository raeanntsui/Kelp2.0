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
import UpdateSpotPage from "../UpdateSpotForm";

function ShowOneSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spots.oneSpot);
  const reviews = useSelector((state) => state.reviews.Reviews);

  const userId = sessionUser?.id;
  const businessOwnerId = spot.user_id;
  const businessOwner = userId === businessOwnerId;

  useEffect(() => {
    console.log("userId:", userId);
    console.log("businessOwnerId:", businessOwnerId);
    console.log("businessOwner:", businessOwner);
    dispatch(getReviewsThunk(spotId));
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  const handleSpotUpdate = () => {
    history.push(`/spots/${spotId}/update`);
  };

  return (
    <>
      <div className="spot-details-page">
        <div className="spot-details-bottom">
          <div className="spot-about-info">
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
        </div>
        <div className="delete-spot">
          <DeleteSpot />
        </div>
        <div>
          {/* {businessOwner && (
            <>
              <h1>Update Spot</h1>
              <button onClick={handleSpotUpdate}>
                Update Spot <UpdateSpotPage />
              </button>
            </>
          )} */}
        </div>

        <div className="left-right">
          <div className="left">
            <div className="write-review">
              {sessionUser && !businessOwner ? (
                <ReviewModal spot={spot} />
              ) : null}
            </div>
            <div className="show-one-spot-bottom-content">
              <div className="spot-details-top">
                <h2 className="review-h1">Reviews</h2>
                <div className="spot-reviews">
                  {Object.values(reviews).map((review, index) => (
                    <div className="each-review">
                      <div className="icon">
                        <i class="fa-solid fa-user"></i>
                      </div>
                      <div className="name">
                        <p className="name-p">
                          {review.user.first_name} {review.user.last_name}
                        </p>
                        {/* <p>{review.rating}</p> */}
                        <p key={index}>{review.description}</p>
                        <img src={review.user_img} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* <UpdateReview spot={spot} review={currentUserReview} /> */}

                {businessOwner && (
                  <div>
                      <div>
                        <DeleteSpot />
                        <h1>Update Spot</h1>
                        <button onClick={handleSpotUpdate}>Update Spot</button>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="right">
            <div className="about-restaurant">
              <div className="directions">
                <h1>Get Directions</h1>
                <h2>
                  {spot.address} <i id="maps" className="fa-solid fa-map"></i>
                </h2>
                <h1>About the Business</h1>
                <h3>{spot.description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowOneSpot;
