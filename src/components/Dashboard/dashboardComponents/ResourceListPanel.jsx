import { Link } from "react-router";

const ResourceListPanel = (props) => {
  return (
    <section>
      <h2>Resources</h2>

      {!props.resources.length && <p>No resources yet.</p>}

      <ul className="resource-list">
        {props.resources.map((resource) => (
          <li key={resource.id} className="resource-item">
            <h3>{resource.title}</h3>
            <p className="muted">{resource.category}</p>
            <p>{`${resource.address}, ${resource.city}`}</p>

            <Link className="resource-link" to={`/resources/${resource.id}`}>
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ResourceListPanel;
