import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import VideoForm from "./VideoForm";
import { OnSaveClickParams } from "../../types";
import { VideoFormData } from "../../api/types";

const VideoEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { data: videoData, isLoading: videoLoading } = useQuerySingleResource(
    "videos",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  async function handleSaveClick({
    formData,
  }: OnSaveClickParams<VideoFormData>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "videos",
        resourceID: params.id,
        data: formData,
      });
    }
  }

  return (
    <VideoForm
      title="Edit Video"
      isSaving={updateResourceLoading}
      onSaveClick={handleSaveClick}
      isLoading={videoLoading}
      initialData={videoData}
    />
  );
};

export default observer(VideoEdit);
