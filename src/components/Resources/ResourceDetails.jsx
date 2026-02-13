import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";

import * as resourceService from "../../services/resourceService";
import { UserContext } from "../../contexts/UserContext";
import * as verificationService from "../../services/verificationService";
import VerificationForm from "../Verifications/VerificationForm";

const ResourceDetails = (props) => {
  const { resourceId } = useParams();
  console.log("resourceId", resourceId);
  const [resource, setResource] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchResource = async () => {
      const resourceData = await resourceService.show(resourceId);

      resourceData.verifications = resourceData.verifications || [];

      setResource(resourceData);
    };
    fetchResource();
  }, [resourceId]);
  console.log("resource state:", resource);

  const handleAddVerification = async (verificationFormData) => {
    const newVerification = await verificationService.create(
      resourceId,
      verificationFormData
    );

    if (newVerification?.error) {
      console.log(newVerification.error);
      return;
    }

    setResource({
      ...resource,
      verifications: [newVerification, ...resource.verifications],
    });
  };

  if (!resource) return <main>Loading...</main>;

  const isOwner = resource.resource_author_id === user?.id;

  const currentStatus =
    resource.verifications.length > 0 ? resource.verifications[0].status : null;

  return (
    <main>
      <section>
        <header>
          <p>{resource.category}</p>
          <h1>{resource.title}</h1>

          <p>
            {`${resource.author_username} posted on
            ${new Date(resource.createdAt).toLocaleDateString()}`}
          </p>

          {currentStatus && (
            <p>
              <strong>Current status:</strong> {currentStatus}
            </p>
          )}

          {isOwner && (
            <>
              <Link to={`/resources/${resourceId}/edit`}>Edit</Link>

              <button onClick={() => props.handleDeleteResource(resourceId)}>
                Delete
              </button>
            </>
          )}
        </header>

        {resource.description && <p>{resource.description}</p>}

        <p>
          <strong>Address:</strong> {resource.address}, {resource.city}
        </p>

        {resource.requirements && (
          <p>
            <strong>Requirements:</strong> {resource.requirements}
          </p>
        )}
      </section>

      <section>
        <h2>Community Check-ins</h2>

        <VerificationForm handleAddVerification={handleAddVerification} />

        {!resource.verifications.length && <p>There are no check-ins yet.</p>}

        {resource.verifications.map((v) => (
          <article key={v.verification_id}>
            <header>
              <p>
                {`${v.verification_author_username} checked in on
                ${new Date(v.createdAt).toLocaleDateString()}`}
              </p>
              <p>
                <strong>Status:</strong> {v.status}
              </p>
            </header>

            <p>{v.note}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ResourceDetails;
