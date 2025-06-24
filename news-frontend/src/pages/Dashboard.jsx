// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import axios from "axios";

const Dashboard = () => {
  const [topLiked, setTopLiked] = useState([]);
  const [topDisliked, setTopDisliked] = useState([]);
  const [mostEngaged, setMostEngaged] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [likedRes, dislikedRes, engagedRes] = await Promise.all([
          axios.get("http://localhost:5000/api/stats/top-liked"),
          axios.get("http://localhost:5000/api/stats/top-disliked"),
          axios.get("http://localhost:5000/api/stats/most-engaged"),
        ]);
  
        console.log("Top Liked", likedRes.data);
        console.log("Top Disliked", dislikedRes.data);
        console.log("Most Engaged", engagedRes.data);
  
        setTopLiked(likedRes.data);
        setTopDisliked(dislikedRes.data);
        setMostEngaged(engagedRes.data);
  
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
  
    fetchStats();
  }, []);
  

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard title="🔥 Top Liked Articles" stats={topLiked} />
      <StatsCard title="👎 Top Disliked Articles" stats={topDisliked} />
      <StatsCard title="📊 Most Engaged Articles" stats={mostEngaged} />
    </div>
  );
};

export default Dashboard;
