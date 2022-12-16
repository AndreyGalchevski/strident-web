import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Merchandise } from "../../api/types";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import MerchandiseForm from "./MerchandiseForm";
import { OnSaveClickParams } from "../../types";

const MerchandiseEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { data: merchandiseData, isLoading: merchandiseLoading } =
    useQuerySingleResource("merchandise", params.id, {
      enabled: !!params?.id,
    });

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<Merchandise>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "merchandise",
        resourceID: params.id,
        data: formData,
        image,
      });
    }
  }

  return (
    <MerchandiseForm
      title="Edit Merchandise"
      onSaveClick={handleSaveClick}
      isSaving={updateResourceLoading}
      isLoading={merchandiseLoading}
      initialData={merchandiseData}
    />
  );
};

export default observer(MerchandiseEdit);
