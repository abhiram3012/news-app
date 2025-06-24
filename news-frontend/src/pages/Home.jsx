import { useState, useEffect } from "react";
import axios from "../utils/api";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("/news")
      .then(response => setNews(response.data))
      .catch(error => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map(article => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
