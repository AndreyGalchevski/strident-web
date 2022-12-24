import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import GigForm from "./GigForm";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import { OnSaveClickParams } from "../../types";
import { GigFormData } from "../../api/types";

const GigEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  const { data: gigData, isLoading: gigLoading } = useQuerySingleResource(
    "gigs",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<GigFormData>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceID: params.id,
        resourceName: "gigs",
        data: formData,
        image: image,
      });
    }
  }

  return (
    <GigForm
      title="Edit Gig"
      isLoading={gigLoading}
      isSaving={updateResourceLoading}
      initialData={gigData}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(GigEdit);
