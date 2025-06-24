import { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {
    const [news, setNews] = useState([]);
    const [reactions, setReactions] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/api/news")
            .then(response => {
                console.log(response.data);
    
                // Deduplicate articles based on their URL
                const uniqueArticles = [];
                const seenUrls = new Set();
    
                response.data.forEach(article => {
                    if (!seenUrls.has(article.url)) {
                        seenUrls.add(article.url);
                        uniqueArticles.push(article);
                    }
                });
    
                setNews(uniqueArticles);
    
                // Initialize reactions using unique article _id
                const initialReactions = {};
                uniqueArticles.forEach(article => {
                    initialReactions[article._id] = { likes: 0, dislikes: 0 };
                });
                setReactions(initialReactions);
            })
            .catch(error => console.error("Error fetching news:", error));
    }, []);
    
    

    const handleLike = async (articleId) => {
        try {
            console.log(articleId);
            await axios.post(`http://localhost:5000/api/kafka/${articleId}/like`, {
                userId: "user123",
                articleId,
                action: "like"
            });
            setReactions(prev => ({
                ...prev,
                [articleId]: {
                    ...prev[articleId],
                    likes: (prev[articleId]?.likes || 0) + 1
                }
            }));
        } catch (err) {
            console.error("Like failed:", err);
        }
    };

    const handleDislike = async (articleId) => {
        try {
            await axios.post(`http://localhost:5000/api/kafka/${articleId}/dislike`, {
                userId: "user123",
                articleId,
                action: "dislike"
            });
            setReactions(prev => ({
                ...prev,
                [articleId]: {
                    ...prev[articleId],
                    dislikes: (prev[articleId]?.dislikes || 0) + 1
                }
            }));
        } catch (err) {
            console.error("Dislike failed:", err);
        }
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-5">Latest News</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article) => (
                    <div key={article._id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                        {article.urlToImage && (
                            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-lg" />
                        )}
                        <h3 className="text-lg font-semibold mt-3">{article.title}</h3>
                        <p className="text-gray-600 mt-2">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-blue-500 hover:text-blue-700 font-medium">
                            Read more →
                        </a>

                        <div className="flex items-center mt-3 space-x-4">
                            <button
                                onClick={() => handleLike(article._id)}
                                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                👍 {reactions[article._id]?.likes || 0}
                            </button>
                            <button
                                onClick={() => handleDislike(article._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                👎 {reactions[article._id]?.dislikes || 0}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsFeed;
