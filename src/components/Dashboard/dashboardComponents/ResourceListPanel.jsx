import { Link } from "react-router";

const ResourceListPanel = (props) => {
  return (
    <section className="panel">
      <div className="resources-header">
        <h2>Resources</h2>

        <span className="muted">
          {!props.resources.length && <p>No resources match your filters.</p>}
        </span>
      </div>

      <ul className="resource-list">
        {props.resources.map((resource) => {
          const isSelected = props.selectedResource?.id === resource.id;

          return (
            <li key={resource.id}>
              <button
                type="button"
                className={`resource-article resource-select ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => props.setSelectedResource(resource)}
              >
                <div className="resources-header">
                  <h3>{resource.title}</h3>
                  <span className="muted">{resource.category}</span>
                </div>
                <p className="muted">{`${resource.address}, ${resource.city}`}</p>

                <Link className="primary" to={`/resources/${resource.id}`}>
                  View Details
                </Link>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ResourceListPanel;
