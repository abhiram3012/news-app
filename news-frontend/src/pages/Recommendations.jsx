import { useEffect, useState } from "react";
import axios from "axios";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recommend/recommend")
      .then(res => {
        const raw = res.data.recommendations || [];

        // Remove duplicates based on the unique URL
        const unique = Array.from(new Map(raw.map(item => [item.url, item])).values());

        setRecommendations(unique);
      })
      .catch(err => console.error("Failed to fetch recommendations", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Recommended Articles</h2>
      {recommendations.length === 0 ? (
        <p className="text-gray-500">No recommendations available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {recommendations.map((article, index) => (
            <li key={index} className="border-b pb-4">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline text-lg font-medium"
              >
                {article.title}
              </a>
              <p className="text-sm text-gray-600 mt-1">{article.source?.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendations;
