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
import DeleteSpotImage from "../DeleteSpotImage";
import OpenModalButton from "../OpenModalButton";
import ImageUploadModal from "../CreateSpotImage";
import { useModal } from "../../context/Modal";

function ShowOneSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { openModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spots.allSpots[spotId]);
  const reviews = useSelector((state) => state.reviews.Reviews);
  const spotReviews = Object.values(reviews).filter(
    (review) => review.spot_id === parseInt(spotId)
  );

  const userId = sessionUser?.id;
  const businessOwnerId = spot?.user_id;
  const businessOwner = userId === businessOwnerId;

  const renderStars = (rating) => {
    const starElements = [];
    const filledStars = Math.floor(rating);

    for (let i = 0; i < filledStars; i++) {
      starElements.push(
        <i key={i} className="fa-solid fa-star filled-stars"></i>
      );
    }

    const emptyStars = 5 - filledStars;
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <i key={`empty-${i}`} className="fa-regular fa-star filled-stars"></i>
      );
    }

    return starElements;
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = spotReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / spotReviews.length;
  };

  const averageRating = calculateAverageRating();

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  const handleSpotUpdate = () => {
    history.push(`/spots/${spotId}/update`);
  };

  if (!spot) {
    return null;
  }

  return (
    <>
      <div className="spot-details-page">
        <div className="spot-details-bottom">
          {spot.img_urls?.length > 0 ? (
            spot.img_urls.map((imageUrl, imageIndex) => (
              <img
                key={imageIndex}
                src={imageUrl}
                alt={`Spot Image ${imageIndex}`}
              />
            ))
          ) : (
            // default img if there's no img
            <img
              src="https://m.media-amazon.com/images/M/MV5BZjgzNGUyNDQtMWMxMS00Nzc0LWE1NWQtODRkYzZiMDNlODQ2XkEyXkFqcGdeQXVyMTM0Mjc1MDYw._V1_.jpg"
              alt="default spot image"
            />
          )}
          <div className="spot-about-info">
            <div className="business-name">
              <p>{spot.business_name}</p>
            </div>
            <div className="filled-star">
              <p>{renderStars(averageRating)}</p>
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
                        <p>{renderStars(review.rating)}</p>
                        <p
                          className={`review-img1 ${
                            review.user_img ? "with-img" : ""
                          }`}
                          key={index}
                        >
                          {review.description}
                        </p>
                        {review.user_img && (
                          <img src={review.user_img} alt="User" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {businessOwner && (
                  <div>
                    <div className="delete-spot">
                      <DeleteSpot />
                      <h1>Update Spot</h1>
                      <button onClick={handleSpotUpdate}>Update Spot</button>

                      <DeleteSpotImage />
                    </div>

                    <OpenModalButton
                      buttonText="Upload Image"
                      modalComponent={<ImageUploadModal spotId={spotId} />}
                    />
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
