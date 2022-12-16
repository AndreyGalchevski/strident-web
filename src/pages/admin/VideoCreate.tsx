import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import VideoForm from "./VideoForm";
import { OnSaveClickParams } from "../../types";
import { Video } from "../../api/types";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";

const VideoCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<Video>): Promise<void> {
    await createResource({
      resourceName: "videos",
      data: formData,
    });
  }

  return (
    <VideoForm
      title="Create Video"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(VideoCreate);
