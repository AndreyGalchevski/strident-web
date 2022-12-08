import { useNavigate } from "react-router";
import { ResourceName } from "../../../api/utils";

interface Props {
  resourceName: ResourceName;
}

function ResourceCreatedVariant({ resourceName }: Props) {
  const navigate = useNavigate();

  const onViewResourceClick = () => {
    navigate(`/${resourceName}`);
  };

  return (
    <>
      <h2 style={{ marginBottom: 2, textAlign: "center" }}>Success!</h2>
      <p>View the new resource</p>
      <button onClick={onViewResourceClick}>Go</button>
    </>
  );
}

export default ResourceCreatedVariant;
