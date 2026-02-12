const CategoryFilter = (props) => {
  const handleChange = (evt) => {
    props.setCategory(evt.target.value);
  };

  return (
    <div className="control">
      <label htmlFor="category-input">Category</label>
      <select
        required
        id="category-input"
        value={props.category}
        onChange={handleChange}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Housing">Housing</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
