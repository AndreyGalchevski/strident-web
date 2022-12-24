import { ResourceName } from "../../../api/types";
import useMutationDeleteResource from "../../../hooks/mutations/useMutationDeleteResource";
import Button from "../../Button";

interface Props {
  resourceName: ResourceName;
  resourceID: string;
  handleModalClose: () => void;
}

function ConfirmDeletionVariant({
  resourceName,
  resourceID,
  handleModalClose,
}: Props) {
  const {
    mutate: deleteResource,
    isLoading: deleteLoading,
    error: deleteError,
  } = useMutationDeleteResource();

  const onDeleteClick = () => {
    deleteResource(
      { resourceName, resourceID },
      {
        onSuccess: () => {
          handleModalClose();
        },
      }
    );
  };

  return (
    <>
      <h2 style={{ marginBottom: 2, textAlign: "center" }}>Warning!</h2>
      <p>Are you sure about this?</p>
      {deleteError && <p>{deleteError.message}</p>}
      <Button
        onClick={onDeleteClick}
        disabled={deleteLoading}
        isLoading={deleteLoading}
      >
        Delete
      </Button>
    </>
  );
}

export default ConfirmDeletionVariant;
