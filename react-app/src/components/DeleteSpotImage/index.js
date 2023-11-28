import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpotImageThunk } from "../../store/spots";

function DeleteSpotImage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const yesbutton = async () => {
    console.log("SPOT ID BEFORE DELETE IMAGE THUNK", spotId);
    await dispatch(deleteSpotImageThunk(spotId));
  };

  return (
    <>
      <div id="delete-review">
        <h1>Confirm Delete Spot Image</h1>
        <h2>Are you sure you want to remove the image for this Spot?</h2>
        <button id="top-button-delete" onClick={yesbutton}>
          Yes (Delete Spot Image)
        </button>
      </div>
    </>
  );
}

export default DeleteSpotImage;
