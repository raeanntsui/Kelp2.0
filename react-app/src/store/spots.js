// constants
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";

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

// CreateThunks -- add spot to spots
export const createSpotThunk = (newSpot) => async (dispatch) => {
  const res = await fetch("/api/spots/new", {
    method: "POST",
    body: newSpot,
  });

  if (res.ok) {
    const { newSpot } = await res.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  } else {
    console.log("There is an error creating a new Spot");
  }
};

export const deleteSpotThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteSpot(id));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

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

    case CREATE_SPOT:
      newState = { ...state };
      newState.spots[action.spot.id] = action.spot;
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
    default:
      return state;
  }
};

export default spotsReducer;
