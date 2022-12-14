import { ResourceName } from "../../../api/apiClient";
import useMutationDeleteResource from "../../../hooks/mutations/useMutationDeleteResource";

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
      <button onClick={onDeleteClick} disabled={deleteLoading}>
        {deleteLoading ? "Loading..." : "Delete"}
      </button>
    </>
  );
}

export default ConfirmDeletionVariant;
