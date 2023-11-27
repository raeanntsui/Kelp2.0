import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import ReviewForm from "./form";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview";
import "./reviews.css";

export default function ReviewModal({ spot }) {
  console.log("🚀 >>>>>>>>>> ~ spot:", spot);
  const dispatch = useDispatch();
  const { setModalContent, setonModalClose } = useModal();

  const user = useSelector((state) => state.session.user);

  const spotReviews = useSelector((state) => state.reviews.Reviews);
  // console.log("spotReviews>>>>>>>:   ", spotReviews);

  const currentSpotReviews = Object.values(spotReviews);

  useEffect(() => {
    dispatch(getReviewsThunk(spot.id));
  }, [dispatch, spot]);

  // if (!user) return null;
  if (!currentSpotReviews) return null;

  let currReview;
  //bla bla
  // find whether current user has posted a review at this spot or not
  if (user) {
    currReview = currentSpotReviews.find(
      (review) => user.id === review.user_id
    );
  }
  console.log("🚀 >>>>>>>>>> ~ currReview:", currReview);
  return (
    <>
      <div className="post-review">
        <button
          id="post-review-button"
          className="postReview"
          type="submit"
          onClick={() => {
            setModalContent(<ReviewForm spot={spot} />);
          }}
        >
          <i className="fa-regular fa-star"></i> Write a review
        </button>
      </div>

      <div className="delete-button">
        {user &&
        currentSpotReviews.some((review) => review.user_id === user.id) ? (
          <OpenModalButton
            buttonText="Delete my review"
            modalComponent={<DeleteReview review={currReview} />}
          />
        ) : null}
      </div>
    </>
  );
}
