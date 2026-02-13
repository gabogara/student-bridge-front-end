import { Link, useLocation } from "react-router";

const ResourceList = ({ resources }) => {
  const location = useLocation();
  const from = location.pathname + location.search;
  return (
    <main className="page">
      <h1>Resources</h1>

      <div className="button-row">
        <Link to="/resources/new" state={from}>
          <button className="primary" type="button">
            + Add Resource
          </button>
        </Link>
        <Link to="/">
          <button type="button">Return to Dashboard</button>
        </Link>
      </div>
      {!resources.length && <p>No resources yet.</p>}
      <div className="resources-grid">
        {resources.map((resource) => (
          <Link
            key={resource.id}
            to={`/resources/${resource.id}`}
            state={{ from }}
          >
            <article className="resource-article">
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
      </div>
    </main>
  );
};

export default ResourceList;
