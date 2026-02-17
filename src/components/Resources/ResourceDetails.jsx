import { useParams, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";

import * as resourceService from "../../services/resourceService";
import { UserContext } from "../../contexts/UserContext";
import * as verificationService from "../../services/verificationService";
import VerificationForm from "../Verifications/VerificationForm";
import * as saveService from "../../services/saveService";
import SaveButton from "../Saves/SaveButton";

import "./ResourceDetails.css";

const ResourceDetails = (props) => {
  const { resourceId } = useParams();
  console.log("resourceId", resourceId);
  const [resource, setResource] = useState(null);
  const [editingVerificationId, setEditingVerificationId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/resources";

  useEffect(() => {
    const fetchResource = async () => {
      const resourceData = await resourceService.show(resourceId);

      resourceData.verifications = resourceData.verifications || [];

      setResource(resourceData);

      const savedList = await saveService.index();
      if (!savedList?.error) {
        const saved = savedList.some((r) => r.id === Number(resourceId));
        setIsSaved(saved);
      }
    };
    fetchResource();
  }, [resourceId]);
  console.log("resource state:", resource);

  const handleToggleSave = async () => {
    if (!resource) return;

    let result;
    if (isSaved) {
      console.log("Remove Selected")
    } else {
      result = await saveService.create(resourceId);
    }

    if (result?.error) {
      console.log(result.error);
      return;
    }

    setIsSaved(!isSaved);
  };

  const handleAddVerification = async (verificationFormData) => {
    const newVerification = await verificationService.create(
      resourceId,
      verificationFormData
    );

    if (newVerification?.error) {
      console.log(newVerification.error);
      return;
    }

    setResource((prev) => {
      const prevVerifications = prev.verifications || [];

      const exists = prevVerifications.some(
        (v) => v.verification_id === newVerification.verification_id
      );

      return {
        ...prev,
        verifications: exists
          ? prevVerifications.map((v) =>
              v.verification_id === newVerification.verification_id
                ? newVerification
                : v
            )
          : [newVerification, ...prevVerifications],
      };
    });
  };

  const handleDeleteVerification = async (verificationId) => {
    const result = await verificationService.deleteVerification(
      resourceId,
      verificationId
    );

    if (result?.error) {
      console.log(result.error);
      return;
    }

    setResource({
      ...resource,
      verifications: resource.verifications.filter(
        (v) => v.verification_id !== verificationId
      ),
    });
  };

  const handleUpdateVerification = async (
    verificationId,
    verificationFormData
  ) => {
    const updated = await verificationService.update(
      resourceId,
      verificationId,
      verificationFormData
    );

    if (updated?.error) {
      console.log(updated.error);
      return;
    }

    setResource({
      ...resource,
      verifications: resource.verifications.map((v) =>
        v.verification_id === verificationId ? updated : v
      ),
    });

    setEditingVerificationId(null);
  };

  if (!resource) return <main>Loading...</main>;

  const isOwner = resource.resource_author_id === user?.id;

  const currentStatus =
    resource.verifications.length > 0 ? resource.verifications[0].status : null;

  return (
    <main className="page">
      <div className="details-layout">
        <section className="card details-left">
          <header className="details-header">
            <div className="details-top">
              <button type="button" onClick={() => navigate(from)}>
                Go Back
              </button>

              <SaveButton
                isSaved={isSaved}
                handleToggleSave={handleToggleSave}
              />

              {isOwner && (
                <div className="details-actions">
                  <Link
                    to={`/resources/${resourceId}/edit`}
                    state={{ from: location.pathname + location.search }}
                  >
                    <button type="button">Edit</button>
                  </Link>

                  <button
                    type="button"
                    className="danger"
                    onClick={() => props.handleDeleteResource(resourceId)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <p className="muted">{resource.category}</p>
            <h1>{resource.title}</h1>

            <p className="muted">
              {`${resource.author_username} posted on ${new Date(
                resource.createdAt
              ).toLocaleDateString()}`}
            </p>

            {currentStatus && (
              <p className="status-line">
                <strong>Current status:</strong> {currentStatus}
              </p>
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

        <section className="card details-right">
          <h2>Community Check-ins</h2>

          <div className="checkin-form">
            <VerificationForm
              handleSubmitVerification={handleAddVerification}
            />
          </div>

          {!resource.verifications.length && (
            <p className="muted">There are no check-ins yet.</p>
          )}

          <div className="checkin-list">
            {resource.verifications.map((v) => (
              <article key={v.verification_id} className="checkin-item">
                <header className="checkin-header">
                  <div>
                    <p className="muted">
                      {`${
                        v.verification_author_username
                      } checked in on ${new Date(
                        v.createdAt
                      ).toLocaleDateString()}`}
                    </p>

                    <p>
                      <strong>Status:</strong> {v.status}
                    </p>
                  </div>

                  {v.verification_author_id === user?.id && (
                    <div className="checkin-actions">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingVerificationId(v.verification_id)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="danger"
                        onClick={() =>
                          handleDeleteVerification(v.verification_id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </header>

                {editingVerificationId === v.verification_id ? (
                  <div className="checkin-edit">
                    <VerificationForm
                      initialData={{ status: v.status, note: v.note }}
                      buttonText="UPDATE"
                      handleSubmitVerification={(formData) =>
                        handleUpdateVerification(v.verification_id, formData)
                      }
                      handleCancel={() => setEditingVerificationId(null)}
                    />
                  </div>
                ) : (
                  <p>{v.note}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResourceDetails;
