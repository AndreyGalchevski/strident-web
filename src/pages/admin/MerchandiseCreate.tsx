import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import { Merchandise } from "../../api/types";
import MerchandiseForm from "./MerchandiseForm";
import { OnSaveClickParams } from "../../types";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";

const MerchandiseCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<Merchandise>): Promise<void> {
    if (!image) {
      throw new Error("Must select a file");
    }

    await createResource({
      resourceName: "merchandise",
      data: formData,
      image,
    });
  }

  return (
    <MerchandiseForm
      title="Create Merchandise"
      onSaveClick={handleSaveClick}
      isSaving={createResourceLoading}
    />
  );
};

export default observer(MerchandiseCreate);
