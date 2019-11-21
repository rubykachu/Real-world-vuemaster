export const dispatchError = (dispatch, message) => {
  const notification = {
    type: "error",
    message: "There was a problem fetching events: " + message
  };
  dispatch("notification/add", notification, { root: true });
};

export const dispatchSuccess = (dispatch, message = null) => {
  const notification = {
    type: "success",
    message: message ? "Your event has been created!" : message
  };
  dispatch("notification/add", notification, { root: true });
};

export const errorResponse = ({ statusText, statusCode }) => {
  return {
    response: {
      statusText: statusText,
      status: statusCode
    }
  };
};
