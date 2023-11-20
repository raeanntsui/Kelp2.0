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

const getOneSpot = (spot) => {
  return {
    type: GET_ONE_SPOT,
    spot,
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

const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot,
  };
};

// thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(getAllSpots(spots));
    return spots;
  } else {
    const errors = await res.json();
    return errors;
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
    default:
      return state;
  }
};

// const spotsReducer = (state = initialState, action) => {
//   let newState = {};
//   switch (action.type) {
//     case GET_ALL_SPOTS:
//       newState = { ...state };
//       newState.allSpots = action.spots;
//       return newState;
//     default:
//       return state;
//   }
// };

export default spotsReducer;
