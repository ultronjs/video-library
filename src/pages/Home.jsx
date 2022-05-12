import react,{useEffect,useState} from "react";
import Nav from "../components/Nav/Nav";
import Banner from "../components/Banner/Banner";
import Row from "../components/Row/Row";
import axios from "../utils/axios";


function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get("/categories");
      setCategories(response.data.categories);
      return response;
    }
    fetchCategories();
  }, []);
  return (
    <div className="App">
      {/* {Nav} */}
      <Nav />
      {/* {Banner} */}
      <Banner />

      {/* {Rows} */}
      {categories.length > 0 &&
        categories.map((category) => <Row title={category.categoryName} isLargeRow={category.isLargeRow} />)}
    </div>
  );
}

export default Home;