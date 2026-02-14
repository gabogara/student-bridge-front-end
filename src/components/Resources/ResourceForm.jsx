import { useParams, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import * as resourceService from "../../services/resourceService";

const ResourceForm = (props) => {
  const { resourceId } = useParams();
  console.log("If new it must be undefined", resourceId);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/resources";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Food",
    address: "",
    city: "",
    requirements: "",
  });

  useEffect(() => {
    const fetchResource = async () => {
      const resourceData = await resourceService.show(resourceId);

      // Prefill form data from the transaction returned by the API
      setFormData({
        title: resourceData.title ?? "",
        description: resourceData.description ?? "",
        category: resourceData.category ?? "Food",
        address: resourceData.address ?? "",
        city: resourceData.city ?? "",
        requirements: resourceData.requirements ?? "",
      });
    };
    if (resourceId) fetchResource();

    return () =>
      setFormData({
        title: "",
        description: "",
        category: "Food",
        address: "",
        city: "",
        requirements: "",
      });
  }, [resourceId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("formData in resource", formData);
    if (resourceId) {
      props.handleUpdateResource(resourceId, formData);
    } else {
      props.handleAddResource(formData);
    }
  };

  return (
    <main className="page">
      <div className="form-container">
        <div className="card">
          <h1>{resourceId ? "Edit Resource" : "New Resource"}</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Title</label>
            <input
              required
              type="text"
              name="title"
              id="title-input"
              value={formData.title}
              onChange={handleChange}
            />

            <label htmlFor="description-input">Description</label>
            <textarea
              type="text"
              name="description"
              id="description-input"
              value={formData.description}
              onChange={handleChange}
            />

            <label htmlFor="category-input">Category</label>
            <select
              required
              name="category"
              id="category-input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>

            <label htmlFor="address-input">Address</label>
            <input
              required
              type="text"
              name="address"
              id="address-input"
              value={formData.address}
              onChange={handleChange}
            />

            <label htmlFor="city-input">City</label>
            <input
              required
              type="text"
              name="city"
              id="city-input"
              value={formData.city}
              onChange={handleChange}
            />

            <label htmlFor="requirements-input">Requirements</label>
            <textarea
              type="text"
              name="requirements"
              id="requirements-input"
              value={formData.requirements}
              onChange={handleChange}
            />
            <div className="button-row">
              <button className="primary" type="submit">
                SUBMIT
              </button>
              <button type="button" onClick={() => navigate(from)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResourceForm;
