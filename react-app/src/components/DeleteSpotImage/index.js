import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpotImageThunk } from "../../store/spots";

function DeleteSpotImage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageDeleted, setImageDeleted] = useState(false);

  const deletedImageId = useSelector(
    (state) => state.spotImages?.deletedImageId
  );

  useEffect(() => {
    // console.log("useEffect is being executed");

    if (deletedImageId === spotId) {
      setImageDeleted(true);
    }
  }, [deletedImageId, spotId]);

  const yesbutton = async () => {
    // console.log("SPOT ID BEFORE DELETE IMAGE THUNK", spotId);
    await dispatch(deleteSpotImageThunk(spotId));
    setImageDeleted(true);
    // console.log("After dispatch and setImageDeleted");
    history.push(`/spots/${spotId}`);
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
