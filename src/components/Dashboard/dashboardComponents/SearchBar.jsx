const SearchBar = (props) => {
  const handleChange = (evt) => {
    props.setSearchText(evt.target.value);
  };

  return (
    <div className="control">
      <label htmlFor="search-input">Search</label>
      <input
        type="text"
        id="search-input"
        autoComplete="off"
        value={props.searchText}
        onChange={handleChange}
        placeholder="Title, description, address, city..."
      />
    </div>
  );
};

export default SearchBar;
