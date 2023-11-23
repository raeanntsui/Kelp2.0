import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewThunk } from "../../store/reviews";

function UpdateReview({ reviewId, initialData }) {
  const [description, setDescription] = useState(initialData.description || "");
  const [starRating, setStarRating] = useState(initialData.rating || 0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

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
    e.preventDefault();
    setSubmit(true);

    const updatedReview = {
      description: description,
      rating: starRating,
    };

    if (Object.keys(errors).length === 0) {
      dispatch(updateReviewThunk(reviewId, updatedReview));
      closeModal();
      setSubmit(false);
      return null;
    }
  };

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
        {/* The rest of your star rating code remains the same */}
      </div>
      <div>
        <p>Stars</p>
      </div>

      {/* Add debugging information */}
      <p>Check Validation: {checkValidation() ? "Valid" : "Invalid"}</p>
      <p>Submit: {submit.toString()}</p>

      {/* Display button state for debugging */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!checkValidation()}
        style={{ border: "1px solid black" }} // Add a border for visibility
      >
        Update Your Review
      </button>
    </form>
  );
}

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Update Your Review</h2>
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Update your review here..."
//       />
//       <p>{submit && errors.description}</p>

//       <div className="stars">
//         <i
//           className={
//             (hover || starRating) >= 1
//               ? "fa-solid fa-star"
//               : "fa-regular fa-star"
//           }
//           onMouseEnter={() => setHover(1)}
//           onMouseLeave={() => setHover(0)}
//           onClick={() => setStarRating(1)}
//         />
//         <i
//           className={
//             (hover || starRating) >= 2
//               ? "fa-solid fa-star"
//               : "fa-regular fa-star"
//           }
//           onMouseEnter={() => setHover(2)}
//           onMouseLeave={() => setHover(0)}
//           onClick={() => setStarRating(2)}
//         />
//         <i
//           className={
//             (hover || starRating) >= 3
//               ? "fa-solid fa-star"
//               : "fa-regular fa-star"
//           }
//           onMouseEnter={() => setHover(3)}
//           onMouseLeave={() => setHover(0)}
//           onClick={() => setStarRating(3)}
//         />
//         <i
//           className={
//             (hover || starRating) >= 4
//               ? "fa-solid fa-star"
//               : "fa-regular fa-star"
//           }
//           onMouseEnter={() => setHover(4)}
//           onMouseLeave={() => setHover(0)}
//           onClick={() => setStarRating(4)}
//         />
//         <i
//           className={
//             (hover || starRating) >= 5
//               ? "fa-solid fa-star"
//               : "fa-regular fa-star"
//           }
//           onMouseEnter={() => setHover(5)}
//           onMouseLeave={() => setHover(0)}
//           onClick={() => setStarRating(5)}
//         />
//       </div>
//       <div>
//         <p>Stars</p>
//       </div>

//       <button
//         type="submit"
//         onClick={handleSubmit}
//         disabled={!checkValidation()}
//       >
//         Update Review
//       </button>
//     </form>
//   );
// }

export default UpdateReview;
