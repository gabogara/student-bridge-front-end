import { Link } from "react-router";

const ResourceListPanel = (props) => {
  return (
    <section>
      <h2>Resources</h2>

      {!props.resources.length && <p>No resources match your filters.</p>}

      <ul className="resource-list">
        {props.resources.map((resource) => {
          const isSelected = props.selectedResource?.id === resource.id;

          return (
            <li
              key={resource.id}
              className={
                isSelected ? "resource-item selected" : "resource-item"
              }
            >
              <button
                type="button"
                className="resource-select"
                onClick={() => props.setSelectedResource(resource)}
              >
                <h3>{resource.title}</h3>
                <p className="muted">{resource.category}</p>
                <p>{`${resource.address}, ${resource.city}`}</p>
              </button>

              <Link className="resource-link" to={`/resources/${resource.id}`}>
                View Details
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ResourceListPanel;
