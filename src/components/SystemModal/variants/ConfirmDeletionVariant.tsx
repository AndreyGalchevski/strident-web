import { useNavigate } from "react-router";
import { ResourceName } from "../../../api/utils";
import useMutationDeleteResource from "../../../hooks/mutations/useMutationDeleteResource";

interface Props {
  resourceName: ResourceName;
  resourceID: string;
}

function ConfirmDeletionVariant({ resourceName, resourceID }: Props) {
  const navigate = useNavigate();
  const { mutate: deleteResource } = useMutationDeleteResource();

  const onDeleteClick = () => {
    deleteResource(
      { resourceName, resourceID },
      {
        onSettled: () => {
          navigate(`/${resourceName}`);
        },
      }
    );
  };

  return (
    <>
      <h2 style={{ marginBottom: 2, textAlign: "center" }}>Warning!</h2>
      <p>Are you sure about this?</p>
      <button onClick={onDeleteClick}>Delete</button>
    </>
  );
}

export default ConfirmDeletionVariant;
