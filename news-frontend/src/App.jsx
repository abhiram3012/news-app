import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewsFeed from './NewsFeed';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Simple navigation menu (optional) */}
        <nav className="mb-6 space-x-4 text-blue-600">
          <Link to="/">News Feed</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/recommendations">Recommendations</Link>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
