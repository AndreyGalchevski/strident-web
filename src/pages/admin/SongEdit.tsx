import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import SongForm from "./SongForm";
import { OnSaveClickParams } from "../../types";
import { SongFormData } from "../../api/types";

const SongEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { data: songData, isLoading: songLoading } = useQuerySingleResource(
    "songs",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<SongFormData>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "songs",
        resourceID: params.id,
        data: formData,
      });
    }
  }

  return (
    <SongForm
      title="Edit Song"
      isSaving={updateResourceLoading}
      onSaveClick={handleSaveClick}
      isLoading={songLoading}
      initialData={songData}
    />
  );
};

export default observer(SongEdit);
