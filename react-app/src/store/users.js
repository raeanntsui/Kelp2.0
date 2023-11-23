// constants
const GET_ALL_USERS = "spots/GET_ALL_SPOTS";

// action creators
const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

// thunk
export const getAllUsersThunk = () => async (dispatch) => {
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
