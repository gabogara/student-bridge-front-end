import { useState } from "react";

const VerificationForm = (props) => {
  const [formData, setFormData] = useState({
    status: "Active",
    note: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddVerification(formData);
    setFormData({ status: "Active", note: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="status-input">Status:</label>
      <select
        required
        name="status"
        id="status-input"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Active">Active</option>
        <option value="Temporarily Closed">Temporarily Closed</option>
        <option value="No Longer Available">No Longer Available</option>
        <option value="Info Needs Update">Info Needs Update</option>
      </select>

      <label htmlFor="note-input">Note:</label>
      <textarea
        required
        name="note"
        id="note-input"
        value={formData.note}
        onChange={handleChange}
      />

      <button type="submit">SUBMIT CHECK-IN</button>
    </form>
  );
};

export default VerificationForm;
