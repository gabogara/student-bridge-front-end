import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";

import * as resourceService from "../../services/resourceService";
import { UserContext } from "../../contexts/UserContext";

const ResourceDetails = (props) => {
  const { resourceId } = useParams();
  console.log("resourceId", resourceId);
  const [resource, setResource] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchResource = async () => {
      const resourceData = await resourceService.show(resourceId);
      setResource(resourceData);
    };
    fetchResource();
  }, [resourceId]);
  console.log("resource state:", resource);
  if (!resource) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{resource.category.toUpperCase()}</p>
          <h1>{resource.title}</h1>
          <p>
            {`${resource.author_username} posted on
              ${new Date(resource.createdAt).toLocaleDateString()}`}
          </p>

          {resource.resource_author_id === user.id && (
            <>
              <Link to={`/resources/${resourceId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteResource(resourceId)}>
                Delete
              </button>
            </>
          )}
        </header>

        {resource.description && <p>{resource.description}</p>}
        <p>{resource.address}</p>
        <p>{resource.city}</p>
        {resource.requirements && <p>{resource.requirements}</p>}
      </section>
    </main>
  );
};

export default ResourceDetails;
