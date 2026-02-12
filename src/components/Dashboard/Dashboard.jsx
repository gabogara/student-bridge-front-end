import { useState } from "react";
import SearchBar from "./dashboardComponents/SearchBar";
import "./dashboard.css";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Explore resources on the map and filter them from the list.</p>
      </header>

      <section className="dashboard-controls">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <div className="control">
          <label>Category</label>
          <select>
            <option>All</option>
          </select>
        </div>

        <button type="button">Clear</button>
      </section>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <h2>Resources</h2>
          <p>List placeholder</p>
        </aside>

        <section className="dashboard-map">
          <h2>Map</h2>
          <div className="map-container">Map placeholder</div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
