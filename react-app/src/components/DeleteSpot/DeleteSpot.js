import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpot.css";
import { useModal } from "../../context/Modal";

function DeleteSpot({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [exists, setExists] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    setExists(false);
    closeModal();
  };

  const doNotDeleteAndCloseModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      {exists && (
        <div id="delete-review">
          <h1>Confirm Delete</h1>
          <h2>Are you sure you want to remove this spot from the listings?</h2>
          <div id="delete-review-button">
            <button id="top-button-delete" onClick={handleSubmit}>
              Yes (Delete Spot)
            </button>
            <button
              id="bottom-button-delete"
              onClick={doNotDeleteAndCloseModal}
            >
              No (Keep Spot)
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteSpot;
