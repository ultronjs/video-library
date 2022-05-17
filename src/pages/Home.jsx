import react,{useEffect,useState} from "react";
import {Nav,Banner,Row} from "../components";
import axios from "../utils/axios";
import {useAuth, useLikedVideo,useWatchLater} from "../context"


function Home() {
  const [categories, setCategories] = useState([]);
  const [videos,setVideos] = useState([])
  const { getLikedVideoData } = useLikedVideo();
  const { getWatchLaterData } = useWatchLater();
  const {signInStatus } = useAuth()
  useEffect(() => {
    (async() => {
      const response = await axios.get("/categories");
      setCategories(response.data.categories);
      return response;
    })();
    (async () => {
      const response = await axios.get("/videos");
      setVideos(response.data.videos);
      return response;
    })();
    if(signInStatus.status){
      getLikedVideoData();
      getWatchLaterData();
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
        categories.map((category) => <Row title={category.categoryName} videos={videos.filter(video=>video.category === category.categoryName)} isLargeRow={category.isLargeRow}/>)}
    </div>
  );
}

export default Home;
