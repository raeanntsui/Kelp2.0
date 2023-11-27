import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";

function ReviewForm({ spot }) {
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [userImgUrl, setUserImgUrl] = useState("");
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const checkValidation = () => {
    return description.length > 10 && starRating;
  };

  useEffect(() => {
    let errObj = {};
    if (!description || description.length < 10)
      errObj.description =
        "Please enter a minimum of 10 characters for your review";
    // if (!userImgUrl) errObj.userImgUrl = "Please enter a valid image URL";

    setErrors(errObj);
  }, [description]);

  const handleSubmit = async (e) => {
    if (!spot.id) {
      return null;
    }
    e.preventDefault();
    setSubmit(true);

    const submitReview = {
      description: description,
      rating: starRating,
      user_img: userImgUrl,
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

      <input
        type="url"
        id="userImgUrl"
        value={userImgUrl}
        onChange={(e) => setUserImgUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <p>{submit && errors.user_img}</p>

      {/* {userImgUrl && (
        <div>
          <p>Image Preview:</p>
          <img src={userImgUrl} alt="User's uploaded image" />
        </div>
      )} */}

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

      <button
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
