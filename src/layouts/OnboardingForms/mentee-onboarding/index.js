import React, { useState } from "react";

// Ensure the backend URL is set as an environment variable or use a static value for testing
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/mentee-onboarding";
const MenteeOnboarding = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [verticals, setVerticals] = useState([]);
  const [persona, setPersona] = useState("");
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerticalChange = (e) => {
    const value = e.target.value;
    setVerticals((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          verticals,
          persona,
          intent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form. Please try again later.");
      }

      alert("Form submitted successfully!");
      setJobTitle("");
      setVerticals([]);
      setPersona("");
      setIntent("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Mentee Onboarding Form</h2>
      {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Job Title Input */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Job Title (What role are you aspiring?):</strong>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
              required
              style={{ display: "block", width: "100%", marginTop: "10px" }}
            />
          </label>
        </div>

        {/* Vertical Checkboxes */}
        <div style={{ marginBottom: "20px" }}>
          <strong>Vertical (What industries are you interested in?):</strong>
          {["Health", "Government", "Academia"].map((option) => (
            <div key={option}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  checked={verticals.includes(option)}
                  onChange={handleVerticalChange}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        {/* Persona Radio Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <strong>Pick a Persona:</strong>
          {[
            "Recent College Grad",
            "Rising Star",
            "Consistent Contributor",
            "Fast Follower",
            "Seasoned Exec",
          ].map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={persona === option}
                  onChange={(e) => setPersona(e.target.value)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        {/* Intent Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Pick an Intent:</strong>
            <select
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              required
              style={{ display: "block", width: "100%", marginTop: "10px" }}
            >
              <option value="" disabled>
                Select an option
              </option>
              {[
                "Don’t Know Yet – open to change",
                "Actively Job Hunting",
                "Actively Seeking Promotion",
                "New to Job Industry",
                "Building my Professional Brand",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenteeOnboarding;
