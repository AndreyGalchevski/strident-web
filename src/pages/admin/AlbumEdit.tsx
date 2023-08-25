import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import AlbumForm from "./AlbumForm";
import { OnSaveClickParams } from "../../types";
import { AlbumFormData } from "../../api/types";

const AlbumEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { data: albumData, isLoading: albumLoading } = useQuerySingleResource(
    "albums",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<AlbumFormData>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "albums",
        resourceID: params.id,
        data: formData,
      });
    }
  }

  return (
    <AlbumForm
      title="Edit Album"
      isSaving={updateResourceLoading}
      onSaveClick={handleSaveClick}
      isLoading={albumLoading}
      initialData={albumData}
    />
  );
};

export default observer(AlbumEdit);
