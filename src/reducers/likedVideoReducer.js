export const likedVideoReducer = (likedVideo, action) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.payload];
    case "ADD_TO_LIKED_VIDEOS":
      return [...likedVideo, action.payload];
    case "REMOVE_FROM_LIKED_VIDEOS":
      return [
        ...likedVideo.filter((element) => element._id !== action.payload),
      ];
    default:
      return [...likedVideo];
  }
};
