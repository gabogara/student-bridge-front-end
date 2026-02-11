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
