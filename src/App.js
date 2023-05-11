import React, { useState } from "react";
import "./App.css";
import ActivitySection from "./components/ActivitySection";
import TableComponent from "./components/Table";

function App() {
  const [showActivitySection, setShowActivitySection] = useState(false);
  const [showTableSection, setShowTableSection] = useState(false);

  const handleLinkClick = () => {
    setShowActivitySection(true);
  };

  const handleTableShowClick = () => {
    setShowActivitySection(false);
    setShowTableSection(true);
  };

  return (
    <div className="App">
      <header className="hero-panel">
        <div className="welcome-banner">
          <h1>Welcome to Practice by Numbers</h1>
          <p>Start your coding challenge now!</p>
        </div>

        <div className="quick-nav-links">
          <button className="quick-link" onClick={handleLinkClick}>
            Show Grid
          </button>
          <button className="quick-link" onClick={handleTableShowClick}>
            Show Table
          </button>
        </div>
        <div className="hero-image">
          <img src="./assets/hero-img.png" alt="Hero Image" />
        </div>
      </header>
      {showActivitySection && <ActivitySection />}
      {showTableSection && <TableComponent />}
    </div>
  );
}

export default App;
