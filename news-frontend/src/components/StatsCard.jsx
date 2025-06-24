// src/components/StatsCard.jsx

const StatsCard = ({ title, stats }) => {
  if (!Array.isArray(stats)) return null;

  return (
    <div className="p-4 shadow rounded-lg border w-full">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            <th>Article ID</th>
            <th>👍 Likes</th>
            <th>👎 Dislikes</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item) => (
            <tr key={item._id} className="border-b">
              <td>{item.articleId}</td>
              <td>{item.like}</td>
              <td>{item.dislike}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsCard;
