import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_REVIEW_BLOG_FAIL,
  ALL_REVIEW_BLOG_REQUEST,
  ALL_REVIEW_BLOG_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_RESET,
  DELETE_BLOG_SUCCESS,
  DELETE_REVIEW_BLOG_FAIL,
  DELETE_REVIEW_BLOG_REQUEST,
  DELETE_REVIEW_BLOG_RESET,
  DELETE_REVIEW_BLOG_SUCCESS,
  NEW_BLOG_FAIL,
  NEW_BLOG_REQUEST,
  NEW_BLOG_RESET,
  NEW_BLOG_SUCCESS,
  NEW_REVIEW_BLOG_FAIL,
  NEW_REVIEW_BLOG_REQUEST,
  NEW_REVIEW_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_RESET,
  UPDATE_BLOG_SUCCESS,
} from "../constants/blogConstants.js";
import {
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
} from "../constants/productConstants.js";

export const blogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOG_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case ALL_BLOG_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };
    case ALL_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newBlogReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case NEW_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case NEW_BLOG_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        blog: action.payload.blog,
      };
    case NEW_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BLOG_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_REQUEST:
    case UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_BLOG_FAIL:
    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BLOG_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_BLOG_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const blogDetailsReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BLOG_DETAILS_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
      };
    case BLOG_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_BLOG_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const blogReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_BLOG_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_BLOG_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
