const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const DELETE_REVIEW = "/spots/DELETE_REVIEW";

//Action
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const updateReview = (newReview) => ({
  type: UPDATE_REVIEW,
  newReview,
});

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

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
      const review = await res.json();
      dispatch(createReview(review));
      await dispatch(getReviewsThunk(spotId));
      return review;
    } else {
      console.error(`Server error: ${res.status}`);
    }
  } catch (e) {
    return await e.json();
  }
};

export const updateReviewThunk =
  (reviewId, updatedReviewData) => async (dispatch) => {
    const urlParams = new URLSearchParams();
    for (const key of Object.keys(updatedReviewData)) {
      urlParams.append(key, updatedReviewData[key]);
    }
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlParams,
    });

    if (res.ok) {
      const updatedReview = await res.json();
      dispatch(updateReview(updatedReview.updateReview));
      return updatedReview.updateReview;
    } else {
      console.error(`Server error: ${res.status}`);
      return { error: `Server error: ${res.status}` };
    }
  };

export const deleteReviewThunk = (review) => async (dispatch) => {
  let res;
  try {
    res = await fetch(`/api/reviews/${review.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(deleteReview(review.id));
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
      newState.Reviews[action.review.id] = action.review;
      return newState;

    case UPDATE_REVIEW:
      newState = {
        ...state,
        Reviews: { ...state.Reviews },
      };
      newState.Reviews[action.newReview.id] = action.newReview;
      return newState;

    case DELETE_REVIEW:
      newState = {
        ...state,
        Reviews: { ...state.Reviews },
      };
      delete newState.Reviews[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
