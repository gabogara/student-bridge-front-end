import { useState, useEffect, useMemo } from "react";

const VerificationForm = (props) => {
  const initialFormData = useMemo(() => {
    if (props.initialData) {
      return {
        status: props.initialData.status ?? "Active",
        note: props.initialData.note ?? "",
      };
    }
    return { status: "Active", note: "" };
  }, [props.initialData]);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleSubmitVerification(formData);

    if (!props.initialData) {
      setFormData({ status: "Active", note: "" });
    }
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

      <button type="submit">
        {props.buttonText ? props.buttonText : "SUBMIT"}
      </button>

      {props.initialData && props.handleCancel && (
        <button type="button" onClick={props.handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default VerificationForm;
