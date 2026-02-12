import { useState } from "react";
import SearchBar from "./dashboardComponents/SearchBar";
import "./dashboard.css";
import CategoryFilter from "./dashboardComponents/CategoryFilter";
import ResourceListPanel from "./dashboardComponents/ResourceListPanel";
import MapView from "./dashboardComponents/MapView";

const Dashboard = (props) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");

  const filteredResources = props.resources.filter((resource) => {
    const matchesCategory =
      category === "All" || resource.category === category;

    const text = searchText.toLowerCase();

    const matchesSearch =
      (resource.title || "").toLowerCase().includes(text) ||
      (resource.description || "").toLowerCase().includes(text) ||
      (resource.address || "").toLowerCase().includes(text) ||
      (resource.city || "").toLowerCase().includes(text);

    return matchesCategory && matchesSearch;
  });

  const handleClearFilters = () => {
    setSearchText("");
    setCategory("All");
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Explore resources on the map and filter them from the list.</p>
      </header>

      <section className="dashboard-controls">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <CategoryFilter category={category} setCategory={setCategory} />

        <button type="button" onClick={handleClearFilters}>
          Clear
        </button>
      </section>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <ResourceListPanel resources={filteredResources} />
        </aside>

        <section className="dashboard-map">
          <MapView resources={filteredResources} />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
