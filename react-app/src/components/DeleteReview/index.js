import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import "./DeleteReview.css";
export default function DeleteReview({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteReviewThunk(review));
    setDeleted(false);
    closeModal();
  };

  const closeTheModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      {deleted && (
        <div>
          <h1>Confirm Delete</h1>
          <h2>Are you sure you want to delete this review?</h2>
          <button className="delete-button" onClick={handleSubmit}>
            Yes (Delete Review)
          </button>
          <button className="delete-button" onClick={closeTheModal}>
            No (Keep Review)
          </button>
        </div>
      )}
    </>
  );
}
