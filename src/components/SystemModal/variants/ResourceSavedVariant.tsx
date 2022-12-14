import { useNavigate } from "react-router";
import { ResourceName } from "../../../api/apiClient";

interface Props {
  resourceName: ResourceName;
  handleModalClose: () => void;
}

function ResourceSavedVariant({ resourceName, handleModalClose }: Props) {
  const navigate = useNavigate();

  const onViewResourceClick = () => {
    handleModalClose();
    navigate(`/${resourceName}`);
  };

  return (
    <>
      <h2 style={{ marginBottom: 2, textAlign: "center" }}>Success!</h2>
      <p>Resource saved</p>
      <button onClick={onViewResourceClick}>Go</button>
    </>
  );
}

export default ResourceSavedVariant;
