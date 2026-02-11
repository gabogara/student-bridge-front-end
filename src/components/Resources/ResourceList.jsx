import { Link } from "react-router";

const ResourceList = ({ resources }) => {
  return (
    <main>
      {resources.map((resource) => (
        <Link key={resource.id} to={`/resources/${resource.id}`}>
          <article>
            <header>
              <h2>{resource.title}</h2>
              <p>
                {resource.createdAt &&
                  `${new Date(resource.createdAt).toLocaleDateString()}`}
              </p>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default ResourceList;
