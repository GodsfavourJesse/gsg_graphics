import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import "./LogoutButton.css";

const LogoutButton = ({ collapsed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/"); // Redirect to landing page
      }, 1500); // fake loading before redirect
    } catch (error) {
      console.error("Logout Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="logout-wrapper">
      <button className="logout-btn" onClick={() => setConfirming(true)}>
        <FaSignOutAlt className="icon" />
        {!collapsed && <span className="label">Logout</span>}
      </button>

      {/* Confirmation Modal */}
      {confirming && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button 
                className="confirm" 
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "Yes, Logout"}
              </button>
              <button className="cancel" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
