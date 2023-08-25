import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import AlbumForm from "./AlbumForm";
import { OnSaveClickParams } from "../../types";
import { AlbumFormData } from "../../api/types";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";

const AlbumCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<AlbumFormData>): Promise<void> {
    await createResource({
      resourceName: "albums",
      data: formData,
    });
  }

  return (
    <AlbumForm
      title="Create Album"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(AlbumCreate);
