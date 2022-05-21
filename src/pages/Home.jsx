import react,{useEffect,useState} from "react";
import {Nav,Banner,Row} from "../components";
import axios from "../utils/axios";
import {useAuth, useHistory, useLikedVideo,useVideos,useWatchLater} from "../context"


function Home() {
  const [categories, setCategories] = useState([]);
  const {videos,getVideosData} = useVideos()
  const { getLikedVideoData } = useLikedVideo();
  const { getWatchLaterData } = useWatchLater();
  const { getHistoryVideoData } = useHistory()
  const {signInStatus } = useAuth()
  useEffect(() => {
    (async() => {
      const response = await axios.get("/categories");
      setCategories(response.data.categories);
      return response;
    })();
      getVideosData()
    if(signInStatus.status){
      getLikedVideoData();
      getWatchLaterData();
      getHistoryVideoData();
    }
  }, []);
  return (
    <div className="App">
      {/* {Nav} */}
      <Nav />
      {/* {Banner} */}
      <Banner />
      
      {/* {Rows} */}
      {categories.length > 0 &&
        categories.map((category) => <Row key={categories._id} title={category.categoryName} videos={videos.filter(video=>video.category === category.categoryName)} isLargeRow={category.isLargeRow}/>)}
    </div>
  );
}

export default Home;
