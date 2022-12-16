import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import MemberForm from "./MemberForm";
import { Member } from "../../api/types";
import { OnSaveClickParams } from "../../types";

const MemberCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<Member>): Promise<void> {
    if (!image) {
      throw new Error("Must select a file");
    }

    await createResource({
      resourceName: "members",
      data: formData,
      image,
    });
  }

  return (
    <MemberForm
      title="Create Member"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(MemberCreate);
