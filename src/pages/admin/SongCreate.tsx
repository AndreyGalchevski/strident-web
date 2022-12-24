import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import SongForm from "./SongForm";
import { OnSaveClickParams } from "../../types";
import { SongFormData } from "../../api/types";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";

const SongCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<SongFormData>): Promise<void> {
    await createResource({
      resourceName: "songs",
      data: formData,
    });
  }

  return (
    <SongForm
      title="Create Song"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(SongCreate);
