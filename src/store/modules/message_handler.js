export const dispatchError = (dispatch, message) => {
  let notification = {
    type: "error",
    message: "There was a problem fetching events: " + message
  };
  dispatch("notification/add", notification, { root: true });
};

export const dispatchSuccess = (dispatch, message = null) => {
  let notification = {
    type: "success",
    message: message ? "Your event has been created!" : message
  };
  dispatch("notification/add", notification, { root: true });
};
