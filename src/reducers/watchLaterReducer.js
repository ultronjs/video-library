export const watchLaterReducer = (watchLater, action) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.payload];
    case "ADD_TO_WATCH_LATER":
      return [...watchLater, action.payload];
    case "REMOVE_FROM_WATCH_LATER":
      return [
        ...watchLater.filter((element) => element._id !== action.payload),
      ];
    default:
      return [...watchLater];
  }
};
