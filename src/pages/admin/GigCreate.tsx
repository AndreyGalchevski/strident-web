import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import GigForm from "./GigForm";
import { OnSaveClickParams } from "../../types";
import { FILE_NOT_SELECTED_ERROR } from "../../utils/constants";
import { GigFormData } from "../../api/types";

const GigCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<GigFormData>): Promise<void> {
    if (!image) {
      throw new Error(FILE_NOT_SELECTED_ERROR);
    }

    await createResource({
      resourceName: "gigs",
      data: formData,
      image: image,
    });
  }

  return (
    <GigForm
      title="Create Gig"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(GigCreate);
