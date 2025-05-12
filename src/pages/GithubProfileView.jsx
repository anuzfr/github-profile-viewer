import React, { useState, useEffect } from "react";
import "./GitHubProfileView.css";

const GitHubProfileView = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUsername(username);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!submittedUsername) return;
      try {
        const res = await fetch(`https://api.github.com/users/${submittedUsername}`);
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setError(null);
        } else {
          setError(data.message);
          setProfile(null);
        }
      } catch (err) {
        setError("Failed to fetch data");
        setProfile(null);
      }
    };

    fetchProfile();
  }, [submittedUsername]);

  return (
    <div className="viewer-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <p className="error">{error}</p>}
      {profile && (
        <div className="profile-card">
            <img src={profile.avatar_url} alt="Profile" className="avatar" />
            <h2 style={{ color: 'black' }}>{profile.name || profile.login}</h2>
            <p style={{ color: 'black' }}>@{profile.login}</p>
            <p style={{ color: 'black' }}>Followers: {profile.followers}</p>
            <p style={{ color: 'black' }}>Following: {profile.following}</p>
            <p style={{ color: 'black' }}>Repositories: {profile.public_repos}</p>
          <img
            className="contribution-graph"
            src={`https://ghchart.rshah.org/${profile.login}`}
            alt="GitHub Contributions"
          />
        </div>
      )}
    </div>
  );
};

export default GitHubProfileView;

<p style={{ color: 'red' }}>This text is red.</p>