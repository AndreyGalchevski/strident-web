import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import LyricForm from "./LyricForm";
import { OnSaveClickParams } from "../../types";
import { Lyric } from "../../api/types";

const LyricCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<Lyric>): Promise<void> {
    await createResource({ resourceName: "lyrics", data: formData });
  }

  return (
    <LyricForm
      title="Create Lyric"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(LyricCreate);
