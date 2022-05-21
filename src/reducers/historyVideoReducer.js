export const historyVideoReducer = (history, action) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.payload];
    case "ADD_TO_HISTORY":
      return [...history, action.payload];
    case "REMOVE_FROM_HISTORY":
      return [...history.filter((element) => element._id !== action.payload)];
    case "REMOVE_ALL_VIDEO_FROM_HISTORY":
      return [];
    default:
      return [...history];
  }
};
