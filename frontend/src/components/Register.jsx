import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "Cambodia",
    city: "",
  });

  const navigate = useNavigate();
  const { register, isLoading, error, isAuthenticated, clearError } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts or form data changes
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  useEffect(() => {
    if (Object.values(formData).some((value) => value)) {
      clearError();
    }
  }, [formData, clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender: gender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.gender ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNumber ||
      !formData.email ||
      !formData.password
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      // You might want to add a local error state for this
      alert("Passwords do not match");
      return;
    }

    // Prepare data for API (exclude confirmPassword)
    const { confirmPassword, ...registrationData } = formData;

    const result = await register(registrationData);

    if (result.success) {
      navigate("/");
    }
    // Error handling is done in the context
  };

  const handleFacebookLogin = () => {
    console.log("Facebook registration clicked");
    // Add Facebook OAuth logic here
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="register-form">
          {/* Error Display */}
          {error && (
            <div
              className="error-message"
              style={{
                color: "#dc3545",
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* Gender Selection */}
          <div className="gender-group">
            <label className="gender-label">
              Gender <span className="required">*</span>
            </label>
            <div className="gender-options">
              <button
                type="button"
                className={`gender-btn ${
                  formData.gender === "Male" ? "active" : ""
                }`}
                onClick={() => handleGenderChange("Male")}
              >
                Male
              </button>
              <button
                type="button"
                className={`gender-btn ${
                  formData.gender === "Female" ? "active" : ""
                }`}
                onClick={() => handleGenderChange("Female")}
              >
                Female
              </button>
            </div>
          </div>

          {/* Name Fields */}
          <div className="name-row">
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="form-input"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="input-label">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="input-group">
            <label htmlFor="mobileNumber" className="input-label">
              Mobile number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="form-input"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="form-input"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="form-input"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="form-input"
              required
            />
          </div>

          {/* Location Fields */}
          <div className="location-row">
            <div className="input-group">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="Cambodia">Cambodia</option>
                <option value="Thailand">Thailand</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Malaysia">Malaysia</option>
              </select>
            </div>
            <div className="input-group">
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">City/province</option>
                <option value="Phnom Penh">Phnom Penh</option>
                <option value="Siem Reap">Siem Reap</option>
                <option value="Battambang">Battambang</option>
                <option value="Kampong Cham">Kampong Cham</option>
              </select>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="create-account-button"
            disabled={isLoading}
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Facebook Login */}
          <button
            type="button"
            className="facebook-button"
            onClick={handleFacebookLogin}
          >
            <span className="facebook-icon">f</span>
            Continue with Facebook
          </button>

          {/* Login Link */}
          <div className="login-section">
            <span className="login-text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
