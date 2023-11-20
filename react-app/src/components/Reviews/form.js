import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";

function ReviewForm({ spot }) {
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const checkValidation = () => {
    return description.length > 9;
  };

  useEffect(() => {
    let errObj = {};
    if (!description || description.length < 10)
      errObj.description =
        "Please enter a minimum of 10 characters for your review";

    setErrors(errObj);
  }, [description]);

  const handleSubmit = async (e) => {
    if (!spot.id) {
      return null;
    }
    e.preventDefault();
    setSubmit(true);

    const submitReview = {
      userId: user.id,
      spotId: spot.id,
      review: description,
      //   stars: starRating,
    };

    if (Object.keys(errors).length === 0) {
      dispatch(createReviewThunk(submitReview, spot.id));
      closeModal();
      setSubmit(false);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Leave your review here..."
      />
      <p>{submit && errors.description}</p>

      <button
        className="submit-review redButton"
        type="submit"
        onClick={handleSubmit}
        disabled={!checkValidation()}
      >
        Submit Your Review
      </button>
    </form>
  );
}

export default ReviewForm;
