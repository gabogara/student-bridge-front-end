import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import * as saveService from "../../services/saveService";

const SavedResources = () => {
  const location = useLocation();
  const from = location.pathname + location.search;
  const [savedResources, setSavedResources] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await saveService.index();

        if (data?.error) {
          console.log(data.error);
          return;
        }
        setSavedResources(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSaved();
  }, []);

  return (
    <main className="page">
      <div className="resources-header">
        <h1>Saved Resources</h1>
      </div>
      <div className="button-row">
        <Link to="/">
          <button type="button">Return to Dashboard</button>
        </Link>
      </div>

      {!savedResources.length && (
        <p className="muted">You have no saved resources yet.</p>
      )}
      <div className="resources-grid">
        {savedResources.map((r) => (
          <Link key={r.id} to={`/resources/${r.id}`} state={{ from }}>
            <article className="resource-article">
              <div className="resources-header">
                <h2>{r.title}</h2>
              </div>
              <span className="muted">{r.category}</span>

              <p className="muted">
                {r.address}, {r.city}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SavedResources;
