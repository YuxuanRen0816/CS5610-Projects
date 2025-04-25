import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import GamePlay from "./pages/GamePlay";
import HighScoresPage from "./pages/HighScoresPage";
import Rules from "./pages/Rules";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { GameProvider } from "./context/GameContext";
import "./styles/common.css";
import "./styles/game.css";
import "./styles/index.css";
import "./styles/rules.css";
import "./styles/scores.css";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/high-scores" element={<HighScoresPage />} />
            <Route path="/rules" element={<Rules />} />

            <Route
              path="/game/:gameId"
              element={
                <PrivateRoute>
                  <GameProvider>
                    <GamePlay />
                  </GameProvider>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <footer>
          <p>&copy; 2025 Battleship. All rights reserved.</p>
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;


// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate(); // for redirect

//   const handleLogout = async () => {
//     await logout();
//   };

//   const handleNewGame = async () => {
//     try {
//       const res = await axios.post("/api/games/new", {}, { withCredentials: true });
//       const newGameId = res.data.gameId;
//       navigate(`/game/${newGameId}`);
//     } catch (err) {
//       console.error("Failed to create new game:", err);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <h1 className="logo">Battleship</h1>
//         <ul className="nav-links">
//           <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
//           <li><NavLink to="/games" className={({ isActive }) => isActive ? "active" : ""}>All Games</NavLink></li>
//           <li><NavLink to="/high-scores" className={({ isActive }) => isActive ? "active" : ""}>Scores</NavLink></li>
//           <li><NavLink to="/rules" className={({ isActive }) => isActive ? "active" : ""}>Rules</NavLink></li>
//           {user ? (
//             <>
//               <li><button onClick={handleNewGame} className="new-game-btn">New Game</button></li>
//               <li><span className="username">{user.username}</span></li>
//               <li><button onClick={handleLogout} className="logout-btn">Sign Out</button></li>
//             </>
//           ) : (
//             <>
//               <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink></li>
//               <li><NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>Register</NavLink></li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }