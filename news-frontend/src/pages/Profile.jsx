import { useState, useEffect } from "react";
import axios from "../utils/api";
import NewsCard from "../components/NewsCard";

const Profile = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get("/recommendations")
      .then(response => setRecommendations(response.data))
      .catch(error => console.error("Error fetching recommendations:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Personalized News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map(article => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
