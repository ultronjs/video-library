import React from 'react'
import { useParams } from 'react-router'
import { useVideos } from '../context'
import VideoCard from './VideoCard'

function RecommededVideosList() {
  const {videoId} = useParams()
  const {videos} = useVideos()
  const videoPlaying = videos.filter(video => video._id === videoId)
  const videoOfSameCategory = videos.filter(
    (video) => video.category === videoPlaying[0].category
  );
  console.log(videoOfSameCategory)
  return (
    <>
      <h2>Recommeded</h2>
      {videos && (
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