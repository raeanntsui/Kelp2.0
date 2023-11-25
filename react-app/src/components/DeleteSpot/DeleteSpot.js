import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpot.css";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";

function DeleteSpot() {
  const { spotId } = useParams();

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState({});
  const history = useHistory();

  const yesbutton = async () => {
    console.log("Value of id before calling deleteSpotThunk:", spotId);
    await dispatch(deleteSpotThunk(spotId));
    history.push(`/spots`);
    closeModal();
  };
  const nobutton = async () => {
    closeModal();
  };
  return (
    <>
      <div id="delete-review">
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <div id="delete-review-button">
          <button id="top-button-delete" onClick={yesbutton}>
            Yes (Delete Spot)
          </button>
          <button id="bottom-button-delete" onClick={nobutton}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteSpot;
