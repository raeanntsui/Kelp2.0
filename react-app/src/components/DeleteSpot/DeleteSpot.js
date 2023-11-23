import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpot.css";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function DeleteSpot({ spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { push } = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spotId));
    closeModal();
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <>
      <div id="delete-review">
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <div id="delete-review-button">
          <button id="top-button-delete" onClick={handleSubmit}>
            Yes (Delete Spot)
          </button>
          <button id="bottom-button-delete" onClick={handleCancel}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteSpot;
