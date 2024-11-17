import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); // Navigate to different pages

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Example validation (you can replace this with actual authentication logic)
    if (formData.username === "admin" && formData.password === "admin123") {
      navigate("/admin"); // Redirect to admin page upon successful login
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-group">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
