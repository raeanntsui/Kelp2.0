import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import ReviewForm from "./form";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview";
import UpdateReview from "../UpdateReview";
import "./reviews.css";

export default function ReviewModal({ spot }) {
  const dispatch = useDispatch();
  const { setModalContent, setonModalClose } = useModal();

  const user = useSelector((state) => state.session.user);
  const spotReviews = useSelector((state) => state.reviews.Reviews);
  const currentSpotReviews = Object.values(spotReviews);

  useEffect(() => {
    dispatch(getReviewsThunk(spot.id));
  }, [dispatch, spot]);

  // if (!user) return null;
  if (!currentSpotReviews) return null;

  let currReview;
  // find whether current user has posted a review at this spot or not
  if (user) {
    currReview = currentSpotReviews.find(
      (review) => user.id === review.user_id
    );
  }

  return (
    <div className="review-modal-buttons">
      {!currReview && currentSpotReviews.length === 0 ? (
        <>
          <button
            id="first-post-review-button"
            className="postReview"
            type="submit"
            onClick={() => {
              setModalContent(<ReviewForm spot={spot} />);
            }}>
            <i class="fa-solid fa-pen" style={{ color: "white" }}></i> Be the
            first to write a review!
          </button>
        </>
      ) : !currReview && currentSpotReviews.length >= 1 ? (
        <button
          id="post-review-button"
          className="postReview"
          type="submit"
          onClick={() => {
            setModalContent(<ReviewForm spot={spot} />);
          }}>
          <i className="fa-solid fa-star filled-stars"></i> Write a review
        </button>
      ) : null}

      {user &&
      currentSpotReviews.some((review) => review.user_id === user.id) ? (
        <OpenModalButton
          buttonText="Delete my review"
          modalComponent={<DeleteReview review={currReview} />}
        />
      ) : null}
      {user &&
      currentSpotReviews.some((review) => review.user_id === user.id) ? (
        <OpenModalButton
          buttonText="Update my review"
          modalComponent={<UpdateReview spot={spot} review={currReview} />}
        />
      ) : null}
    </div>
  );
}
