import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      <h1>Welcome to Battleship!</h1>
      <p>Challenge your friends or random opponents in this full-stack version of Battleship.</p>
      <div className="landing-actions">
        {user ? (
          <>
            <Link to="/games" className="btn">View All Games</Link>
            <Link to="/high-scores" className="btn">View High Scores</Link>
          </>
        ) : (
          <>
            <Link to="/register" className="btn">Register to Start Playing</Link>
            <Link to="/login" className="btn">Already have an account? Log In</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
