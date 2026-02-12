import { useState } from "react";
import SearchBar from "./dashboardComponents/SearchBar";
import "./dashboard.css";
import CategoryFilter from "./dashboardComponents/CategoryFilter";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [ category, setCategory ]= useState("All")

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Explore resources on the map and filter them from the list.</p>
      </header>

      <section className="dashboard-controls">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <CategoryFilter category= {category} setCategory={setCategory}/>

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
