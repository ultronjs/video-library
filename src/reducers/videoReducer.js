export const videoReducer = (videos, action) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.payload];
    default:
      return [...videos];
  }
};
