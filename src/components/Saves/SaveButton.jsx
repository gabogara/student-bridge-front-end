const SaveButton = (props) => {
  return (
    <button type="button" onClick={props.handleToggleSave}>
      {props.isSaved ? "Unsave" : "Save ❤️"}
    </button>
  );
};

export default SaveButton;
