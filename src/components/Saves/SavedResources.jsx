import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as saveService from "../../services/saveService";

const SavedResources = () => {
  const [savedResources, setSavedResources] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await saveService.index();

        if (data?.error) {
          console.log(data.error);
          return;
        }
        console.log("data saved:", data);
        setSavedResources(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSaved();
  }, []);

  return (
    <main>
      <h1>Saved Resources</h1>

      {!savedResources.length && <p>You have no saved resources yet.</p>}

      {savedResources.map((r) => (
        <article key={r.id}>
          <header>
            <h2>{r.title}</h2>
            <p>{r.category}</p>
          </header>

          <p>
            {r.address}, {r.city}
          </p>

          <Link to={`/resources/${r.id}`}>View details</Link>
        </article>
      ))}
    </main>
  );
};

export default SavedResources;
