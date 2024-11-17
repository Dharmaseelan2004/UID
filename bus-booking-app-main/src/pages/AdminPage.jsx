import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [userDetails, setUserDetails] = useState([]);

  // Fetch user registration details from an API (you should update the API URL)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/users"); // Update with the correct endpoint
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <h2>User Registration Details</h2>

      {/* Table to display the user registration details */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.length > 0 ? (
            userDetails.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  {/* Action buttons (Edit, Delete) */}
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
