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

const updateSpot = (spotId) => {
  return {
    type: UPDATE_SPOT,
    spotId,
  };
};

const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot,
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

export const createSpotThunk = (form) => async (dispatch) => {
  const res = await fetch("/api/spots/new", {
    method: "POST",
    body: form,
  });

  if (res.ok) {
    const { resSpot } = await res.json();
    dispatch(createSpot(resSpot));
    return resSpot;
  } else {
    const data = await res.json();
    return data;
  }
};

export const deleteSpotThunk = (spot) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spot}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteSpot(spot));
    }
  } catch (e) {
    return await e.json();
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
      newState = { ...state, allSpots: { ...state.allSpots } };
      newState.allSpots[action.spot.id] = action.spot;
      return newState;
    case DELETE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots } };
    default:
      return state;
  }
};

export default spotsReducer;
