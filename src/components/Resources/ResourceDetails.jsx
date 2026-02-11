import { useParams, Link } from "react-router";

const ResourceDetails = () => {
  const { resourceId } = useParams();
  console.log("resourceId", resourceId);
  return <div>ResourceDetails</div>;
};

export default ResourceDetails;
