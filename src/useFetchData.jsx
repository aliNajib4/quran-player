import { useReducer, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const initialState = {
  data: null,
  isLoading: true,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_SUCCESS":
      return {
        data: payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        data: null,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

const useFetchData = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err });
      });
  }, [url]);
  return state;
};

useFetchData.propTypes = {
  url: PropTypes.string.isRequired,
};

export {useFetchData};
