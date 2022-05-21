export const playListReducer = (playlists, action) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.payload];
    case "ADD_PLAYLIST":
      return [...playlists, action.payload];
    case "REMOVE_PLAYLIST":
      return [...playlists.filter((element) => element._id !== action.payload)];
    case "ADD_TO_PLAYLIST":
      return [
        ...playlists.map((playlist) =>
          playlist._id === action.payload.id
            ? {
                ...playlist,
                videos: playlist.videos.push(action.payload.video),
              }
            : { ...playlist }
        ),
      ];
    case "REMOVE_FROM_PLAYLIST":
      return [
        ...playlists.map((playlist) =>
          playlist._id === action.payload.playlist_id
            ? {
                ...action.payload.playlist
              }
            : { ...playlist }
        ),
      ];
    default:
      return [...playlists];
  }
};
