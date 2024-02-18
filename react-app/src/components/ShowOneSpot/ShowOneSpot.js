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
  console.log("🚀🚀🚀🚀🚀🚀 ~ reviews:", reviews);

  const userId = sessionUser?.id;
  const businessOwnerId = spot?.user_id;
  const businessOwner = userId === businessOwnerId;
  const reviewCount = spot?.review?.length;
  const arrayOfObjectsForReviews = Object.values(reviews);
  const businessURL = spot?.business_name;
  const businessURLToLowerCase = businessURL?.toLowerCase().replace(/\s/g, "");
  // console.log(
  //   "🚀🚀🚀🚀🚀🚀 ~ arrayOfObjectsForReviews:",
  //   arrayOfObjectsForReviews
  // );
  const reviewByUser = arrayOfObjectsForReviews.find(
    (review) => review.user_id === userId
  );
  // console.log("🚀🚀🚀🚀🚀🚀 ~ reviewByUser:", reviewByUser);

  const matchingReviewUserId = reviewByUser?.user_id;
  // console.log("🚀🚀🚀🚀🚀🚀 ~ matchingReviewUserId:", matchingReviewUserId);
  const spotReviews = Object.values(reviews).filter(
    (review) => review.spot_id === parseInt(spotId)
  );

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
        <i
          key={`empty-${i}`}
          style={{ color: "black" }}
          className="fa-solid fa-star filled-stars"></i>
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
  }, [dispatch, spotId, arrayOfObjectsForReviews.length]);

  const handleSpotUpdate = () => {
    history.push(`/spots/${spotId}/update`);
  };

  if (!spot) {
    return null;
  }

  const newDateFormatter = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const adjustedDate = new Date(date);
    const month = months[adjustedDate.getMonth()];
    const datenumber = adjustedDate.getDate();
    const year = adjustedDate.getFullYear();

    return `${month} ${datenumber}, ${year}`;
  };

  return (
    <>
      <div className="spot-details-page">
        <div className="images">
          {spot.img_urls?.length > 0 ? (
            <img key={0} src={spot.img_urls[0]} alt={`Spot Image 0`} />
          ) : (
            // default img if there's no img
            <img
              src="https://t3.ftcdn.net/jpg/06/42/18/22/360_F_642182262_4kqb9AgMr0qhqBHcwWEgTfvTCOFklokO.jpg"
              alt="default spot image"
            />
          )}
          <div className="title-parent">
            <p className="business-name">{spot.business_name}</p>
            <div className="stars-and-reviews">
              <div
                className="filled-star"
                style={{ fontSize: "40px", margin: "0px" }}>
                {renderStars(averageRating)}
              </div>
              <div className="stars-info">
                {averageRating > 0 && (
                  <div style={{ margin: "10px 5px" }}>
                    {averageRating.toFixed(1)}
                  </div>
                )}
                {reviewCount > 1 ? (
                  <div>({reviewCount} reviews)</div>
                ) : reviewCount === 1 ? (
                  <div>({reviewCount} review)</div>
                ) : (
                  <div style={{ margin: "0px", padding: "0px", gap: "0px" }}>
                    No Reviews Yet!
                  </div>
                )}
              </div>
            </div>

            <div className="title-owner">
              <i
                style={{ color: "rgba(88, 180, 255, 1)" }}
                class="fa-solid fa-circle-check"></i>
              Operated by {spot.user.first_name}
              <i
                class="fa-solid fa-circle fa-sm"
                style={{
                  color: "rgba(88, 180, 255, 1)",
                  fontSize: "5px",
                }}></i>
              <span className="title-categories">{spot.categories}</span>
            </div>

            <div className="open-parent">
              {spot.close_hours > 12 ? (
                <>
                  <p className="open-open">Open</p>
                  <p className="open-until">
                    until {spot.close_hours - 12}:00 PM
                  </p>
                </>
              ) : (
                <>
                  <p className="open-open">Open</p>
                  <p className="open-until">until {spot.close_hours}:00 AM</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="spot-bottom-parent-container">
          <div className="spot-bottom-left-child">
            <div className="show-one-spot-bottom-content">
              <div className="spot-details-top">
                <h2 style={{ paddingTop: "20px", fontSize: "30px" }}>
                  Reviews
                </h2>
                {/* <div className="reviewmodal"> */}
                {sessionUser && userId !== businessOwnerId && !reviewByUser && (
                  <ReviewModal spot={spot} />
                )}
                {/* </div> */}
                {/* <div className="spot-reviews"> */}
                {arrayOfObjectsForReviews.reverse().map((review, index) => (
                  <>
                    <div className="each-review" key={review.id}>
                      <div className="icon">
                        <i
                          style={{
                            padding: "14px",
                            border: "3px solid #58B4FF",
                            borderRadius: "50%",
                            color: "#58B4FF",
                            backgroundColor: "#eeffff",
                          }}
                          class="fa-solid fa-user"></i>
                      </div>
                      <div className="name">
                        <div className="name-p">
                          <div>
                            {review.user.first_name} {review.user.last_name}
                          </div>
                          <div>
                            {review.user_id === userId ? (
                              <ReviewModal spot={spot} />
                            ) : null}
                          </div>
                        </div>

                        <p style={{ fontWeight: "600", padding: "5px 0px" }}>
                          {renderStars(review.rating)}{" "}
                          {newDateFormatter(review.created_at)}
                        </p>
                        <p
                          className={`review-img1 ${
                            review.user_img ? "with-img" : ""
                          }`}
                          key={index}>
                          {review.description}
                        </p>
                        <div className="each-review-picture">
                          {review.user_img && (
                            <img
                              style={{
                                height: "200px",
                                width: "200px",
                                objectFit: "cover",
                              }}
                              src={review.user_img}
                              alt="User"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {/* </div> */}
              </div>
            </div>
            <div className="delete-box">
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
          <div className="right">
            <div className="rightURL">
              <h1
                style={{ color: "#00c413", fontSize: "16px" }}
                onClick={() => alert("Website link coming soon!")}>
                www.{businessURLToLowerCase}.com
              </h1>
            </div>
            <div className="rightPhone">
              <h1
                style={{ color: "rgba(45,46,47,1)", fontSize: "16px" }}
                onClick={() => alert("Telephone feature coming soon!")}>
                Phone Number TBD
              </h1>
              <i
                style={{ color: "#00c413", margin: "0px", padding: "0px" }}
                class="fa-solid fa-phone-volume"></i>
            </div>
            <div className="rightAddress">
              <h1
                style={{ color: "#00c413", fontSize: "16px" }}
                onClick={() => alert("Maps coming soon!")}>
                Get Directions
              </h1>
              <div className="directions">
                <h1 style={{ color: "rgba(110,112,114,1)", fontSize: "16px" }}>
                  {spot.address}{" "}
                </h1>
                <i
                  className="fa-solid fa-location-dot"
                  style={{
                    color: "#00c413",
                    margin: "0px",
                    padding: "0px",
                  }}></i>
              </div>
            </div>
            <div className="rightAboutBusiness">
              <h1 style={{ color: "#00c413", fontSize: "16px" }}>
                About the Business
              </h1>
              <h3 style={{ fontSize: "16px", fontWeight: "500" }}>
                {spot.description}
              </h3>
            </div>
            <div
              onClick={() => alert("Message feature coming soon!")}
              className="rightMessage">
              <h1 style={{ color: "#00c413", fontSize: "16px" }}>
                Message the business
              </h1>
              <i
                style={{ color: "#00c413", margin: "0px", padding: "0px" }}
                class="fa-regular fa-comment-dots"></i>
            </div>
            <div className="rightSuggestions">
              <button
                onClick={() => alert("Suggestions feature coming soon!")}
                className="suggestionsButton">
                <i
                  style={{ color: "#00c413", margin: "0px", padding: "0px" }}
                  class="fa-solid fa-pencil"></i>{" "}
                Suggest an Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowOneSpot;
