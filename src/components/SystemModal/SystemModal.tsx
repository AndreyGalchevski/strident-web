import { observer } from "mobx-react-lite";
import Modal, { Styles } from "react-modal";
import styled from "styled-components";

import useModal from "../../hooks/useModal";
import ConfirmDeletionVariant from "./variants/ConfirmDeletionVariant";
import ErrorVariant from "./variants/ErrorVariant";
import ResourceSavedVariant from "./variants/ResourceSavedVariant";

const CloseButton = styled.button(({ theme: { colors } }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 8,
  right: 8,
  padding: 8,
  width: 40,
  height: 40,
  borderRadius: "50%",
  cursor: "pointer",
  border: "none",
  transitionDuration: "0.4s",
  "&:hover": {
    backgroundColor: colors.grey,
  },
}));

const customStyle: Styles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: 300,
    height: 300,
    top: "50%",
    left: "50%",
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

  const showCloseButton = ["CONFIRM_DELETION", "ERROR"].includes(
    modalState.modalData.modalType
  );

  return (
    <Modal
      isOpen
      onRequestClose={handleModalClose}
      style={customStyle}
      contentLabel="System modal"
      shouldCloseOnOverlayClick={false}
    >
      {showCloseButton && (
        <CloseButton onClick={handleModalClose}>
          <span style={{ fontSize: 24, fontFamily: "sans-serif" }}>
            &times;
          </span>
        </CloseButton>
      )}
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
      </>
    </Modal>
  );
});

export default SystemModal;
