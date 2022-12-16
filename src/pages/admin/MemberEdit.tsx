import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import MemberForm from "./MemberForm";
import { OnSaveClickParams } from "../../types";
import { Member } from "../../api/types";

const MemberEdit: FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { data: memberData, isLoading: memberLoading } = useQuerySingleResource(
    "members",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<Member>): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "members",
        resourceID: params.id,
        data: formData,
        image,
      });
    }
  }

  return (
    <MemberForm
      title="Edit Member"
      isSaving={updateResourceLoading}
      onSaveClick={handleSaveClick}
      isLoading={memberLoading}
      initialData={memberData}
    />
  );
};

export default observer(MemberEdit);
