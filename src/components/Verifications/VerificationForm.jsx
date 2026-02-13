import { useState } from "react";

const VerificationForm = (props) => {
  const [formData, setFormData] = useState({ note: "" });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddVerification(formData);
    setFormData({ note: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="note-input">Verification note</label>
      <textarea
        required
        name="note"
        id="note-input"
        value={formData.note}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT VERIFICATION REQUEST</button>
    </form>
  );
};

export default VerificationForm;
