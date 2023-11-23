const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";

//Action
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const createReview = (newReview) => ({
  type: CREATE_REVIEW,
  newReview,
});

//THUNK
export const getReviewsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/${spotId}`);
    if (res.ok) {
      const reviews = await res.json();
      dispatch(getReviews(reviews));
      // console.log("🚀 >>>>>>>>>> ~ reviews:", reviews);
      return reviews;
    }
  } catch (e) {
    return await e.json();
  }
};

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  let res;
  try {
    const urlParams = new URLSearchParams();
    for (const key of Object.keys(review)) {
      urlParams.append(key, review[key]);
    }
    res = await fetch(`/api/reviews/new/${spotId}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlParams,
    });
    if (res.ok) {
      const newReview = await res.json();
      dispatch(createReview(newReview));
      await dispatch(getReviewsThunk(spotId));
      return newReview;
    } else {
      console.error(`Server error: ${res.status}`);
    }
  } catch (e) {
    return await e.json();
  }
};

const initialState = {
  Reviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state, Reviews: {} };
      if (action.reviews) {
        action.reviews.forEach((review) => {
          newState.Reviews[review.id] = review;
        });
      }
      return newState;
    case CREATE_REVIEW:
      newState = {
        ...state,
        Reviews: { ...state.Reviews },
      };
      newState.Reviews[action.newReview.id] = action.newReview;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
