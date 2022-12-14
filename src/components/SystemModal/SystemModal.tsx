import { observer } from "mobx-react-lite";
import Modal, { Styles } from "react-modal";

import useModal from "../../hooks/useModal";
import ConfirmDeletionVariant from "./variants/ConfirmDeletionVariant";
import ErrorVariant from "./variants/ErrorVariant";
import ResourceSavedVariant from "./variants/ResourceSavedVariant";

const customStyle: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { background: "rgba(0, 0, 0, 0.4)" },
};

Modal.setAppElement("#root");

const SystemModal = observer(() => {
  const modalState = useModal();

  const handleModalClose = () => {
    modalState.hideModal();
  };

  if (!modalState.isVisible || !modalState.modalData) {
    return null;
  }

  return (
    <Modal
      isOpen
      onRequestClose={handleModalClose}
      style={customStyle}
      contentLabel="System modal"
    >
      <section>
        <>
          {(() => {
            switch (modalState.modalData.modalType) {
              case "RESOURCE_SAVED":
                return (
                  <ResourceSavedVariant
                    resourceName={modalState.modalData.resourceName}
                    handleModalClose={handleModalClose}
                  />
                );
              case "ERROR":
                return (
                  <ErrorVariant
                    errorMessage={modalState.modalData.errorMessage}
                  />
                );
              case "CONFIRM_DELETION":
                return (
                  <ConfirmDeletionVariant
                    resourceName={modalState.modalData.resourceName}
                    resourceID={modalState.modalData.resourceID}
                    handleModalClose={handleModalClose}
                  />
                );
              default:
                return null;
            }
          })()}
          <button onClick={handleModalClose}>Close</button>
        </>
      </section>
    </Modal>
  );
});

export default SystemModal;
