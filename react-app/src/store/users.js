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
  const res = await fetch("/api/users/");
  if (res.ok) {
    const users = await res.json();
    dispatch(getAllUsers(users));
    return users;
  } else {
    const errors = await res.json();
    return errors;
  }
};

// initial state
const initialState = {
  allUsers: {},
};

// reducer
const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
      newState = { ...state, allUsers: {} };
      action.users.forEach((user) => {
        newState.allUsers[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
