import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        username,
        password,
        confirmPassword,
      });
      navigate("/login"); // 注册成功后跳转登录
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        setError("Username already taken.");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../utils/AuthContext";

// const RegisterPage = () => {
//   const [username, setUsername] = useState("");
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [error, setError] = useState("");
//   const { register, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password1 !== password2) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       await register(username, password1);
//       navigate("/"); 
//     } catch (err) {
//       setError("Username already taken or server error.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input value={username} onChange={(e) => setUsername(e.target.value)} required />
//         </label>
//         <label>
//           Password:
//           <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
//         </label>
//         <label>
//           Confirm Password:
//           <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
//         </label>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;
