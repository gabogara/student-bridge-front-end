import { Link, useLocation } from "react-router";

const ResourceList = ({ resources }) => {
  const location = useLocation();
  const from = location.pathname + location.search;
  return (
    <main>
      <h1>Resources</h1>

      <div>
        <Link to="/resources/new" state={from}>
          <button type="button">+ Add Resource</button>
        </Link>
        <Link to="/">
          <button type="button">Return to Dashboard</button>
        </Link>
      </div>
      {!resources.length && <p>No resources yet.</p>}

      {resources.map((resource) => (
        <Link
          key={resource.id}
          to={`/resources/${resource.id}`}
          state={{ from }}
        >
          <article>
            <header>
              <h2>{resource.title}</h2>
              <p>
                {`${resource.author_username} posted on
                ${new Date(resource.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            {resource.description && <p>{resource.description}</p>}
          </article>
        </Link>
      ))}
    </main>
  );
};

export default ResourceList;
