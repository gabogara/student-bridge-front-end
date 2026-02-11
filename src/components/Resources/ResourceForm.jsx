import { useState } from "react";

const ResourceForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Food",
    address: "",
    city: "",
    requirements: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("formData", formData);
  };

  return (
    <main>
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
          <option value="Legal">Legal</option>
          <option value="Education">Education</option>
          <option value="General">General</option>
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

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default ResourceForm;
