import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import LyricForm from "./LyricForm";
import { LyricFormData } from "../../api/types";
import { OnSaveClickParams } from "../../types";

const LyricEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { data: lyricData, isLoading: lyricLoading } = useQuerySingleResource(
    "lyrics",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<LyricFormData>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "lyrics",
        resourceID: params.id,
        data: formData,
      });
    }
  }

  return (
    <LyricForm
      title="Edit Lyric"
      isSaving={updateResourceLoading}
      onSaveClick={handleSaveClick}
      isLoading={lyricLoading}
      initialData={lyricData}
    />
  );
};

export default observer(LyricEdit);
