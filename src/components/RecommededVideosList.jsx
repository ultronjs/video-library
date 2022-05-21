import React from 'react'
import { useParams } from 'react-router'
import { useVideos } from '../context'
import VideoCard from './VideoCard'

function RecommededVideosList() {
  const {videoId} = useParams()
  const {videos} = useVideos()
  let videoOfSameCategory
  if(videos.length>0){
  const videoPlaying = videos.filter(video => video._id === videoId)
  videoOfSameCategory = videos.filter(
    (video) => video.category === videoPlaying[0].category && video._id !== videoPlaying[0]._id
  )};
  return (
    <>
      <h2>Recommeded</h2>
      {videos.length>0 && (
        <div className="video_container">
          {videoOfSameCategory.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}

export default RecommededVideosList