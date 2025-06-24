import { useState } from "react";
import axios from "../utils/api";

const NewsCard = ({ article }) => {
  const [likes, setLikes] = useState(article.likes || 0);
  const [dislikes, setDislikes] = useState(article.dislikes || 0);

  const handleLike = async () => {
    setLikes(likes + 1);
    await axios.post("/like", { articleId: article.url });
  };

  const handleDislike = async () => {
    setDislikes(dislikes + 1);
    await axios.post("/dislike", { articleId: article.url });
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover rounded-lg" />
      <h2 className="text-lg font-bold mt-2">{article.title}</h2>
      <p className="text-sm text-gray-600">{article.description}</p>
      <div className="flex justify-between items-center mt-2">
        <button onClick={handleLike} className="text-green-500">👍 {likes}</button>
        <button onClick={handleDislike} className="text-red-500">👎 {dislikes}</button>
      </div>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">Read More</a>
    </div>
  );
};

export default NewsCard;
