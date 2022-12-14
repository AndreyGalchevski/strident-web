import { makeAutoObservable } from "mobx";
import { createContext, FunctionComponent, PropsWithChildren } from "react";
import { ResourceName } from "../api/apiClient";

export type ModalType = "ERROR" | "RESOURCE_SAVED" | "CONFIRM_DELETION";

interface BasicModalData {
  modalType: ModalType;
}

export interface ResourceSavedModalData extends BasicModalData {
  modalType: "RESOURCE_SAVED";
  resourceName: ResourceName;
}

export interface ErrorModalData extends BasicModalData {
  modalType: "ERROR";
  errorMessage: string;
}

export interface ConfirmDeletionModalData extends BasicModalData {
  modalType: "CONFIRM_DELETION";
  resourceName: ResourceName;
  resourceID: string;
}

export type ModalData =
  | ResourceSavedModalData
  | ErrorModalData
  | ConfirmDeletionModalData;

export class ModalState {
  isVisible = false;
  modalData?: ModalData;

  constructor() {
    makeAutoObservable(this);
  }

  showModal(modalData: ModalData) {
    this.isVisible = true;
    this.modalData = modalData;
  }

  hideModal() {
    this.isVisible = false;
    this.modalData = undefined;
  }
}

const ModalContext = createContext<ModalState | undefined>(undefined);

export const ModalProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ModalContext.Provider value={new ModalState()}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
