// constants
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";
const CREATE_SPOT_IMAGE = "spots/CREATE_SPOT_IMAGE";

// action creators
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const getOneSpot = (spotId) => {
  return {
    type: GET_ONE_SPOT,
    spotId,
  };
};

const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    id,
  };
};

const createSpotImage = (newSpotImage) => {
  return {
    type: CREATE_SPOT_IMAGE,
    newSpotImage,
  };
};

// thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots/");
  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    return spots;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spot = await res.json();
    dispatch(getOneSpot(spot));
    return spot;
  }
};

// // CreateThunks -- add spot to spots
// export const createSpotThunk = (newSpot) => async (dispatch) => {
//   const res = await fetch("/api/spots/new", {
//     method: "POST",
//     body: newSpot,
//   });

//   if (res.ok) {
//     const createdSpot = await res.json();
//     dispatch(createSpot(createdSpot));
//     return createdSpot;
//   } else {
//     console.log("There is an error creating a new Spot");
//   }
// };

// export const createSpotImageThunk =
//   (spotId, formData, url, preview) => async (dispatch) => {
//     const res = await fetch(`/api/spots/${spotId}/images`, {
//       method: "POST",
//       body: formData,
//     });

//     if (res.ok) {
//       const createdSpotImage = await res.json();
//       // Add the URL and preview status to the createdSpotImage object
//       createdSpotImage.url = url;
//       createdSpotImage.preview = preview;

//       dispatch(createSpotImage(createdSpotImage));
//       return createdSpotImage;
//     } else {
//       console.error("There is an error creating a new Spot Image");
//     }
//   };

export const createSpotThunk = (newSpot, imageFormData) => async (dispatch) => {
  try {
    const res = await fetch("/api/spots/new", {
      method: "POST",
      body: newSpot,
    });

    if (!res.ok) {
      console.log("There is an error creating a new Spot");
      return;
    }

    const createdSpot = await res.json();

    if (imageFormData) {
      const imageUploadResponse = await dispatch(
        createSpotImageThunk(
          createdSpot.id,
          imageFormData,
          "https://example.com/image-url",
          true
        )
      );

      console.log("Image upload response:", imageUploadResponse);
    }

    dispatch(createSpot(createdSpot));
    return createdSpot;
  } catch (error) {
    console.error("Error creating a new Spot:", error);
  }
};

export const createSpotImageThunk =
  (spotId, formData, url, preview) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const createdSpotImage = await res.json();
      createdSpotImage.url = url;
      createdSpotImage.preview = preview;

      dispatch(createSpotImage(createdSpotImage));
      return createdSpotImage;
    } else {
      console.error("There is an error creating a new Spot Image");
    }
  };

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const spotError = await res.json();
      throw new Error(spotError.message);
    }
    dispatch(deleteSpot(spotId));
  } catch (error) {
    console.error("delete spot error", error.message);
  }
};

// export const deleteSpotThunk = (spotId) => async (dispatch) => {
//   try {
//     const res = await fetch(`/api/spots/${spotId}`, {
//       method: "DELETE",
//     });
//     console.log("🚀 VALUE OF IDDDDDDDDDDDDDDD id:", spotId);

//     if (!res.ok) {
//       let spotError;
//       try {
//         spotError = await res.json();
//       } catch (jsonError) {
//         // Handle non-JSON response
//         console.error("Non-JSON error response:", res.statusText);
//         throw new Error("Spot deletion failed");
//       }

//       throw new Error(spotError.message);
//     }

//     // Dispatch an action to update the Redux store with the successful deletion
//     dispatch(deleteSpotSuccess(spotId));
//   } catch (error) {
//     console.error("delete spot error", error.message);
//     // Dispatch an action to update the Redux store with the error information
//     dispatch(deleteSpotFailure(error.message));
//   }
// };

// update spots thunks
export const updateSpotThunk = (formData, spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const spot = await res.json();
    dispatch(updateSpot(spot));
    return spot;
  } else {
    const data = await res.json();
    return data;
  }
};

// initial state
const initialState = {
  allSpots: {},
  oneSpot: {},
};

// reducer hi
const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: {} };
      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;

    case GET_ONE_SPOT:
      newState = { ...state, oneSpot: action.spotId };
      return newState;

    // case CREATE_SPOT:
    //   newState = { ...state };
    //   newState.spots[action.spot.id] = action.spot;
    //   return newState;

    case CREATE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots } };
      newState.allSpots[action.newSpot.id] = action.newSpot;
      return newState;

    case UPDATE_SPOT:
      newState = {
        ...state,
        spots: { ...state.spots, [action.spot.id]: action.spot },
      };
      return newState;

    case DELETE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots } };
      delete newState.allSpots[action.id];
      return newState;

    // case DELETE_SPOT_SUCCESS:
    //   newState = { ...state, allSpots: { ...state.allSpots } };
    //   delete newState.allSpots[action.spotId];
    //   return newState;

    // case DELETE_SPOT_FAILURE:
    //   // Handle failure, update state accordingly
    //   console.error("Delete spot failure:", action.error);
    //   return state;
    case CREATE_SPOT_IMAGE:
      newState = { ...state };
      newState[action.newSpotImage.id] = action.newSpotImage;
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
