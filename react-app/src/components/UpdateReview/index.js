import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewThunk } from "../../store/reviews";

function UpdateReview({ spot, review }) {
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  // Update state when review prop changes
  useEffect(() => {
    if (review) {
      setDescription(review.description || "");
      setStarRating(review.rating || 0);
    }
  }, [review]);

  const checkValidation = () => {
    return description.length > 9 && starRating;
  };

  useEffect(() => {
    let errObj = {};
    if (!description || description.length < 10)
      errObj.description =
        "Please enter a minimum of 10 characters for your review";

    setErrors(errObj);
  }, [description]);

  const handleSubmit = async (e) => {
    if (!spot.id || !user) {
      return null;
    }
    if (review.user_id !== user.id) {
      console.error("Unauthorized access to update review");
      return null;
    }

    e.preventDefault();
    setSubmit(true);

    const submitReview = {
      description: description,
      rating: starRating,
    };

    if (Object.keys(errors).length === 0) {
      dispatch(updateReviewThunk(review.id, submitReview));
      closeModal();
      setSubmit(false);
      return null;
    }
  };

  // Render nothing if review is undefined
  if (!review) {
    return null;
  }
  const isCurrentUserReview = user && review && user.id === review.user_id;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Your Review</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Update your review here..."
      />
      <p>{submit && errors.description}</p>

      <div className="stars">
        <i
          className={
            (hover || starRating) >= 1
              ? "fa-solid fa-star"
              : "fa-regular fa-star"
          }
          onMouseEnter={() => setHover(1)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setStarRating(1)}
        />
        <i
          className={
            (hover || starRating) >= 2
              ? "fa-solid fa-star"
              : "fa-regular fa-star"
          }
          onMouseEnter={() => setHover(2)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setStarRating(2)}
        />
        <i
          className={
            (hover || starRating) >= 3
              ? "fa-solid fa-star"
              : "fa-regular fa-star"
          }
          onMouseEnter={() => setHover(3)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setStarRating(3)}
        />
        <i
          className={
            (hover || starRating) >= 4
              ? "fa-solid fa-star"
              : "fa-regular fa-star"
          }
          onMouseEnter={() => setHover(4)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setStarRating(4)}
        />
        <i
          className={
            (hover || starRating) >= 5
              ? "fa-solid fa-star"
              : "fa-regular fa-star"
          }
          onMouseEnter={() => setHover(5)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setStarRating(5)}
        />
      </div>

      <div>
        <p>Stars</p>
      </div>

      {isCurrentUserReview && (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!checkValidation()}
        >
          Update Review
        </button>
      )}
    </form>
  );
}

export default UpdateReview;
